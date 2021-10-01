import parse5, { ParentNode, Element, TextNode } from 'parse5';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import html from '../build/index.html';

const handler = async (event: any) => {
  const serverData = {
    from: 'server',
    article: null,
  };
  const document = parse5.parse(html);
  //SEO
  const head = getHead([document]);
  const {
    data: { ok, data },
  } = await axios.get(`https://api.picar.kr/api${event.path}`);
  const { content, title, photos, isDelete } = data;
  serverData.article = data;
  if (ok && !isDelete) {
    changeMeta(head as ParentNode, {
      title,
      description: content,
      image: photos ? photos.split(',')[0] : undefined,
    });
  }

  const result = parse5
    .serialize(document)
    .replace('window.__DATA_FROM_SERVER__', JSON.stringify(serverData));

  return {
    statusCode: 200,
    body: result,
  };
};

export { handler };

function getHead(q: ParentNode[]) {
  while (q.length > 0) {
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

interface MetaData {
  title: string;
  description: string;
  image?: string;
}
function changeMeta(
  head: ParentNode,
  { title: _title, description, image }: MetaData,
) {
  (head.childNodes as Element[]).forEach(({ tagName, attrs, childNodes }) => {
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
  });
}

type Attrs = Element['attrs'];

function setAttrsByName(attrs: Attrs, attrName: string, value: string) {
  if (
    attrs &&
    Array.from(attrs).some(
      ({ name, value }) => name === 'name' && value === attrName,
    )
  ) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}
function setAttrsByProperty(attrs: Attrs, attrName: string, value: string) {
  if (
    attrs &&
    Array.from(attrs).some(
      ({ name, value }) => name === 'property' && value === attrName,
    )
  ) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}
