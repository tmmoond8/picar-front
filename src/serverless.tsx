
// @ts-ignore
import React from "react";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import axios from 'axios';
import parse5, { ParentNode, Element, TextNode } from "parse5";
import bodyParser from "body-parser";
import { renderToString } from "react-dom/server";
// @ts-ignore
import html from "../build/index.html";
// Import React application
import App from "./App";

// Setup for Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('static'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', async (req, res) => {
  const serverData = {
    from: 'server',
  };
  const document = parse5.parse(html);
  //SEO
  const head = getHead([document]);
  if (req.path.startsWith('/article')) {
    const { data: { ok, data } } = await axios.get(`https://api.picar.kr/api${req.path}`) 
    const { content, title, photos, isDelete } = data;
    if (ok && !isDelete) {
      changeMeta(head as ParentNode, {
        title,
        description: content,
        image: photos ? photos.split(',')[0] : undefined,
      });
    }
  }

  const hash = process.env.COMMIT_REF ? `.${process.env.COMMIT_REF}` : '';
  const renderString = renderToString(<App isSSR/>);
  const result = parse5.serialize(document)
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData))
    .replace('.chunk.js', hash +'.chunk.js').replace('.chunk.css', hash + '.chunk.css')
  res.send(result);
});

exports.handler = serverless(app);

function getHead(q: ParentNode[]) {
  while(q.length > 0) {
    const target = q.shift();
    if (!target) {
      return null;
    }
    if (target.nodeName === 'head') {
      return target;
    } else if (target.childNodes) {
      q = q.concat(target.childNodes as ParentNode[]);
    }
  }
}

interface MetaData { title: string, description: string, image?: string};
function changeMeta(head: ParentNode, { title: _title, description, image }: MetaData) {
  (head.childNodes as Element[]).forEach(({
    tagName,
    attrs,
    childNodes
  }) => {
    const title = `PICAR - ${_title}`;
    if (!attrs) return;
    if (tagName === 'meta') {
      setAttrsByProperty(attrs, 'og:title', title);
      setAttrsByProperty(attrs, 'twitter:title', title);
      setAttrsByName(attrs, 'description', description);
      setAttrsByProperty(attrs, 'og:description', description);
      setAttrsByProperty(attrs, 'twitter:description', description);
      if (image) {
        setAttrsByProperty(attrs, 'og:image', image);
      }
    }
    if (tagName === 'title' && childNodes[0]) {
      (childNodes[0] as TextNode).value = 'title';
    }
  })
}

type Attrs = Element['attrs'];

function setAttrsByName(attrs: Attrs, attrName: string, value: string) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'name' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}
function setAttrsByProperty(attrs: Attrs, attrName: string, value: string) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'property' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}