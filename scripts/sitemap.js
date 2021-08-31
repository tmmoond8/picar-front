const fs = require('fs');
const path = require('path');
const today = new Date().toISOString();
const axios = require('axios');

const template = `
<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <sitemap>
      <loc>https://www.picar.kr</loc>
      <lastmod>${today}</lastmod>
    </sitemap>
    {{sitemap}}
  </urlset>`

const API_URL = 'https://www.picar.kr';
// const API_URL = 'http://localhost:6060';

axios.get(`${API_URL}/api/article/last`)
  .then(({ data: { data } }) => {
    const sitemap = Array.from({ length: data.id}).map((_, idx) => `
      <sitemap>
        <loc>https://www.picar.kr/article/${idx + 1}</loc>
        <lastmod>${today}</lastmod>
      </sitemap>`).join('')

    fs.writeFileSync(path.resolve(__dirname, '../build/sitemap.xml'), template.replace('{{sitemap}}', sitemap), 'utf8')
  })



