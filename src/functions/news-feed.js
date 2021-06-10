import RssParser from 'rss-parser';
import format from 'date-fns/format';

const rssParser = new RssParser();

const keywords = ['전기차'];
const reg = new RegExp(`(${keywords.join('|')})`, 'g');

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
  return Promise.all([
    parseENews(),
    parseNewsWire(),
    parseHMG(),
    parseHeraldNews(),
  ]).then((results) => {
    const feeds = results.reduce((accum, r) => accum.concat(r), []);
    feedManager.appendAll(feeds);
  });
};

exports.handler = async function (event, context) {
  await parseAll();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'news feed' }),
  };
};
