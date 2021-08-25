
// @ts-ignore
import React from "react";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { renderToString } from "react-dom/server";

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
  
  const renderString = renderToString(<App isSSR/>);
  const result = template
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
  res.send(result);
});

exports.handler = serverless(app);
const hash = process.env.COMMIT_REF ? `.${process.env.COMMIT_REF}` : '';

var template = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1,width=device-width,viewport-fit=cover">
  <meta name="theme-color" content="#000000" />
  <link rel="apple-touch-icon" href="/logo192.png?t=123" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet">
  <meta name="naver-site-verification" content="25f1b1010cd869d50a0f0b6bdcb2f7b9c685f106" />
  <link rel="manifest" href="/manifest.json" />
  <title>picar</title>
  <meta name="description" content="전기차 커뮤니티, 피카" />
  <meta name="author" content="tmmoond8" />
  <meta name="keywords" content="전기차, 테슬라, 현대" />
  <meta property="og:title" content="picar" />
  <meta property="og:description" content="전기차 커뮤니티, 피카" />
  <meta property="og:type" content="website" />
  <meta property="og:image"
    content="https://static.picar.kr/dhfi7dxpu/image/upload/v1627224649/picar/opengraph_p7rf2v.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="200" />
  <meta property="og:url" content="https://www.picar.kr" />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:creator" content="Tamm" />
  <meta property="twitter:title" content="picar" />
  <meta property="twitter:description" content="전기차 커뮤니티, 피카" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="canonical" href="https://www.picar.kr" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <script>!function (e, t, a, n, g) { e[n] = e[n] || [], e[n].push({ "gtm.start": (new Date).getTime(), event: "gtm.js" }); var m = t.getElementsByTagName(a)[0], r = t.createElement(a); r.async = !0, r.src = "https://www.googletagmanager.com/gtm.js?id=GTM-T3FPLT2", m.parentNode.insertBefore(r, m) }(window, document, "script", "dataLayer")</script>
  <style>
    .splash {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      background-color: #fff;
      z-index: 1000000;
      opacity: 1
    }

    .splash .splash--svg {
      position: fixed;
      width: 320px;
      height: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto
    }
  </style>
  <link href="/static/css/4${hash}.chunk.css" rel="stylesheet">
</head>

<body class="picar"><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3FPLT2" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript><noscript>You need to enable JavaScript to run this
    app.</noscript>
  <div id="root"></div>
  <div class="splash"><svg class="splash--svg" xmlns="http://www.w3.org/2000/svg" width="320" height="320" fill="none"
      viewBox="0 0 320 320">
      <defs>
        <linearGradient id="paint0_linear" x1="91.117" x2="114.873" y1="119.751" y2="175.021"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFD000" />
          <stop offset="1" stop-color="#FB0" />
        </linearGradient>
      </defs>
      <path fill="#fff" d="M0 0H320V320H0z" />
      <path fill="url(#paint0_linear)"
        d="M95.746 149.938H84.131c-.959 0-1.56-1.038-1.081-1.87l15.276-26.567c.534-.928 1.524-1.501 2.595-1.501h20.062c.959 0 1.56 1.038 1.082 1.869l-12.697 22.081h11.615c.959 0 1.56 1.038 1.082 1.869l-15.276 26.567c-.535.929-1.524 1.502-2.596 1.502H84.131c-.959 0-1.56-1.038-1.081-1.869l12.696-22.081z" />
      <path fill="#333" stroke="#333" stroke-width=".249"
        d="M142.059 127.075l-.119-.022-.025.118-.935 4.287-.022.1.094.041c.925.407 1.977.739 3.157.997 1.135.249 2.22.412 3.255.489v22.788c-1.017-.035-2-.07-2.949-.105-.988-.037-1.902-.092-2.743-.165l-.135-.011v5.191l.107.016c1.029.147 2.204.275 3.525.385h0l.004.001c1.319.073 2.712.146 4.178.219l.004.001 4.507.11H158.473c1.467 0 2.971-.019 4.511-.055 1.54-.037 3.044-.092 4.511-.166 1.467-.073 2.861-.165 4.182-.275 1.321-.11 2.496-.238 3.525-.385l.107-.016v-5.191l-.135.011c-.842.074-1.793.147-2.854.22-.986.035-2.005.087-3.058.156v-22.72h4.673v-5.472h-25.247c-.986 0-2.101-.036-3.344-.109-1.205-.11-2.3-.256-3.285-.438zm41.316 40.95h.125v-42.162h-6.736v42.162h6.611zm9.555-41.115l-.119-.022-.026.118-.934 4.288-.022.098.093.042c1.073.481 2.311.85 3.711 1.108 1.399.258 2.689.387 3.871.387h11.309v9.426h-19.13V147.826h19.126c-.036 1.136-.09 2.356-.161 3.662v.003c-.036 1.354-.109 2.745-.219 4.172v.003c-.074 1.428-.165 2.838-.275 4.23-.11 1.391-.238 2.672-.384 3.842l-.016.126.127.014 6.321.659.121.013.016-.121c.183-1.431.349-2.972.495-4.622.147-1.651.275-3.319.385-5.006h0c.11-1.723.184-3.392.22-5.006.074-1.65.11-3.154.11-4.512v-17.826h-17.99c-.986 0-2.101-.036-3.344-.109-1.206-.11-2.301-.256-3.285-.438zm45.234 14.8v-.125h-7.366v-15.722h-6.737v42.162h6.737v-20.968h7.366v-5.347zm-75.638-8.616v22.949H154.2v-22.949h8.326z" />
    </svg></div>
  <script>window.addEventListener("error", e => { e.message.includes("SyntaxError") && e.filename.includes("/static/js") && (window.location.href = "/") })</script>
  <script>!function (e) { function r(r) { for (var n, i, a = r[0], c = r[1], l = r[2], p = 0, s = []; p < a.length; p++)i = a[p], Object.prototype.hasOwnProperty.call(o, i) && o[i] && s.push(o[i][0]), o[i] = 0; for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]); for (f && f(r); s.length;)s.shift()(); return u.push.apply(u, l || []), t() } function t() { for (var e, r = 0; r < u.length; r++) { for (var t = u[r], n = !0, a = 1; a < t.length; a++) { var c = t[a]; 0 !== o[c] && (n = !1) } n && (u.splice(r--, 1), e = i(i.s = t[0])) } return e } var n = {}, o = { 3: 0 }, u = []; function i(r) { if (n[r]) return n[r].exports; var t = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(t.exports, t, t.exports, i), t.l = !0, t.exports } i.e = function (e) { var r = [], t = o[e]; if (0 !== t) if (t) r.push(t[2]); else { var n = new Promise((function (r, n) { t = o[e] = [r, n] })); r.push(t[2] = n); var u, a = document.createElement("script"); a.charset = "utf-8", a.timeout = 120, i.nc && a.setAttribute("nonce", i.nc), a.src = function (e) { return i.p + "static/js/" + ({ 2: "polyfills-dom" }[e] || e) + "${hash}.chunk.js" }(e); var c = new Error; u = function (r) { a.onerror = a.onload = null, clearTimeout(l); var t = o[e]; if (0 !== t) { if (t) { var n = r && ("load" === r.type ? "missing" : r.type), u = r && r.target && r.target.src; c.message = "Loading chunk " + e + " failed.\n(" + n + ": " + u + ")", c.name = "ChunkLoadError", c.type = n, c.request = u, t[1](c) } o[e] = void 0 } }; var l = setTimeout((function () { u({ type: "timeout", target: a }) }), 12e4); a.onerror = a.onload = u, document.head.appendChild(a) } return Promise.all(r) }, i.m = e, i.c = n, i.d = function (e, r, t) { i.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, i.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, i.t = function (e, r) { if (1 & r && (e = i(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (i.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var n in e) i.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, i.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return i.d(r, "a", r), r }, i.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, i.p = "/", i.oe = function (e) { throw console.error(e), e }; var a = this["webpackJsonppicar-front"] = this["webpackJsonppicar-front"] || [], c = a.push.bind(a); a.push = r, a = a.slice(); for (var l = 0; l < a.length; l++)r(a[l]); var f = c; t() }([])</script>
  <script src="/static/js/4${hash}.chunk.js"></script>
  <script src="/static/js/main${hash}.chunk.js"></script>
</body>

</html>
`