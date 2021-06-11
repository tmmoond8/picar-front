import axios from 'axios';
import RssParser from 'rss-parser';
import format from 'date-fns/format';
import dotenv from 'dotenv';
import ogs from 'open-graph-scraper';

dotenv.config();

const rssParser = new RssParser();
const keywords = ['전기차'];
const reg = new RegExp(`(${keywords.join('|')})`, 'g');

const sheetsApi = {
  get: async () =>
    await axios.get(
      `${process.env.SHEET_URL}?sheetName=${process.env.NEWS_FEEDS}`,
    ),
  append: async (feed) =>
    await axios.get(
      `${process.env.SHEET_URL}?sheetName=${process.env.NEWS_FEEDS}`,
      { params: feed },
    ),
};

let existedSet = new Set();

const getOgImage = async (url) => {
  try {
    const { result } = await ogs({ url });
    return (result && result.ogImage && result.ogImage.url) || '';
  } catch (error) {
    console.log(error);
    return '';
  }
};

async function append(feed) {
  if (!existedSet.has(feed.link)) {
    try {
      const image = await getOgImage(feed.link);
      feed.thumbnail = image;
      await sheetsApi.append(feed);
    } catch (error) {
      console.warn(error);
    }
  }
}

async function appendAll(feeds) {
  const queues = [...feeds];
  for (let i = 0; i < queues.length; i++) {
    await append(queues[i]);
  }
}

const filter = (feeds) =>
  feeds.filter((feed) => feed.title.match(reg)) ||
  feeds.filter((feed) => feed.content.match(reg)).length > 2;

const generateID = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd:hh');

const parseHeraldNews = async () => {
  const publisher = 'Herald News';
  const { items } = await rssParser.parseURL(
    'http://biz.heraldcorp.com/common_prog/rssdisp.php?ct=010501000000.xml',
  );
  const feeds = items.map((rawData) => ({
    publisher,
    author: rawData.author,
    title: rawData.title,
    content: rawData.contentSnippet,
    link: rawData.link,
    pubDate: rawData.pubDate,
    id: `${publisher}_${generateID(rawData.pubDate)}`,
  }));
  return filter(feeds);
};

const parseHMG = async () => {
  const publisher = 'HyundaiMotorGroup';
  const items = await Promise.all([
    rssParser.parseURL('http://news.hmgjournal.com/rss/HmgJournalAll'),
    rssParser.parseURL('http://news.hmgjournal.com/rss/HmgJournalTech'),
    rssParser.parseURL('http://news.hmgjournal.com/rss/HmgJournalLife'),
    rssParser.parseURL('http://news.hmgjournal.com/rss/HmgJournalSports'),
  ]).then(([{ items: items1 }, { items: items2 }]) => {
    return [...items1, ...items2];
  });
  const feeds = items.map((rawData) => ({
    publisher,
    author: rawData.author,
    title: rawData.title,
    content: rawData.contentSnippet,
    link: rawData.link,
    pubDate: rawData.pubDate,
    id: `${publisher}_${generateID(rawData.pubDate)}`,
  }));
  return filter(feeds);
};

const parseNewsWire = async () => {
  const publisher = 'NewsWire';
  const items = await Promise.all([
    rssParser.parseURL('https://api.newswire.co.kr/rss/industry/501'),
    rssParser.parseURL('https://api.newswire.co.kr/rss/industry/505'),
  ]).then(([{ items: items1 }, { items: items2 }]) => {
    return [...items1, ...items2];
  });
  const feeds = items.map((rawData) => ({
    publisher,
    author: rawData.author,
    title: rawData.title,
    content: rawData.contentSnippet,
    link: rawData.link,
    pubDate: rawData.pubDate,
    id: `${publisher}_${generateID(rawData.pubDate)}`,
  }));
  return filter(feeds);
};

const parseENews = async () => {
  const publisher = 'ET News';
  const { items } = await rssParser.parseURL('http://rss.etnews.com/60066.xml');
  const feeds = items.map((rawData) => ({
    publisher,
    author: rawData.author,
    title: rawData.title,
    content: rawData.contentSnippet,
    link: rawData.link,
    pubDate: rawData.pubDate,
    id: `${publisher}_${generateID(rawData.pubDate)}`,
  }));
  return filter(feeds);
};

const parseAll = async () => {
  const rawFeeds = await Promise.all([
    parseENews(),
    parseNewsWire(),
    parseHMG(),
    parseHeraldNews(),
  ]);
  const feeds = rawFeeds.reduce((accum, r) => accum.concat(r), []);
  return await appendAll(feeds);
};

exports.handler = async function (event, context) {
  const {
    data: { data },
  } = await sheetsApi.get();
  existedSet = new Set(data.map(({ link }) => link));
  await parseAll();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'news feed' }),
  };
};