import React from 'react';
import { Helmet } from 'react-helmet';
import env from '../../env';

export type Header = {
  title: string;
  description: string;
  image: string;
  favicon: string;
  url: string;
}

const headerData: Header = {
  title: 'picar',
  description: '전기차 커뮤니티, 피카',
  image: 'https://static.picar.kr/dhfi7dxpu/image/upload/v1627224649/picar/opengraph_p7rf2v.png',
  favicon: '/favicon.ico',
  url: 'https://www.picar.kr',
}

const PicarHelmet = (props: Partial<Header>) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title ?? headerData.title}</title>
      <meta name="description" content={props.description ?? headerData.description} />
      <meta property="og:title" content={props.title ?? headerData.title} />
      <meta property="og:description" content={props.description ?? headerData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={props.image ?? headerData.image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
      <meta property="og:url" content={props.url ?? headerData.url} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="Tamm" />
      <meta property="twitter:title" content={props.title ?? headerData.title} />
      <meta property="twitter:description" content={props.description ?? headerData.description} />
      <link rel="apple-touch-icon" href={props.favicon ?? headerData.favicon} />
      <link rel="apple-touch-icon" sizes="64x64" href={props.favicon ?? headerData.favicon} />
      <link rel="canonical" href={props.url ?? headerData.url} />
      <link rel="shortcut icon" href={props.favicon ?? headerData.favicon} />
    </Helmet>
  )
}

export default PicarHelmet;