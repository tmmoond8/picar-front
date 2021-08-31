const fs = require('fs');
const path = require('path');
const today = new Date().toISOString();
const fetch = require('sync-fetch');

const template = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.picar.kr</loc>
      <lastmod>${today}</lastmod>
    </url>{{sitemap}}
  </urlset>`

const API_URL = 'https://api.picar.kr';
// const API_URL = 'http://localhost:6060';

try {
  const { data } = fetch(`${API_URL}/api/article/last`).json();
  const sitemap = Array.from({ length: data.id}).map((_, idx) => `
    <url>
      <loc>https://www.picar.kr/article/${idx + 1}</loc>
      <lastmod>${today}</lastmod>
    </url>`).join('')

  fs.writeFileSync(path.resolve(__dirname, '../build/sitemap.xml'), template.replace('{{sitemap}}', sitemap), 'utf8')
} catch(error ) {
  console.error(error);
}

