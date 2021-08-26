
// @ts-ignore
import React from "react";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { renderToString } from "react-dom/server";
// @ts-ignore
import html from "../build/server.html";
// Import React application
import App from "./App";

// Setup for Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('static'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const serverData = {
    from: 'server',
  };
  const hash = process.env.COMMIT_REF ? `.${process.env.COMMIT_REF}` : '';
  const renderString = renderToString(<App isSSR/>);
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData))
    .replace('.chunk.js', hash +'.chunk.js').replace('.chunk.css', hash + '.chunk.css')
  res.send(result);
});

exports.handler = serverless(app);
