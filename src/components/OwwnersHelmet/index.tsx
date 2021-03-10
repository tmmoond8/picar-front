import React from 'react';
import { Helmet } from 'react-helmet';

export type Header = {
  title: string;
  description: string;
  image: string;
  favicon: string;
  url: string;
}

const headerData: Header = {
  title: 'owwners',
  description: '사장님 커뮤니티, 오너스',
  image: 'https://static.owwners.com/dhfi7dxpu/image/upload/v1614515292/owner/owwners-ad_log4vn.png',
  favicon: '/favicon.ico',
  url: 'https://www.owwners.com',
}

const OwwnersHelmet = (props: Partial<Header>) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title ?? headerData.title}</title>
      <meta name="description" content={props.description ?? headerData.description} />
      <meta name="og:title" content={props.title ?? headerData.title} />
      <meta name="og:description" content={props.description ?? headerData.description} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={props.image ?? headerData.image} />
      <meta name="og:url" content={props.url ?? headerData.url}/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:creator" content="Tamm"/>
      <meta name="twitter:title" content={props.title ?? headerData.title}/>
      <meta name="twitter:description" content={props.description ?? headerData.description}/>
      <link rel="apple-touch-icon" href={props.favicon ?? headerData.favicon} />
      <link rel="apple-touch-icon" sizes="64x64" href={props.favicon ?? headerData.favicon} /> 
      <link rel="canonical" href={props.url ?? headerData.url} />
      <link rel="shortcut icon" href={props.favicon ?? headerData.favicon}/>
    </Helmet>
  )
}

export default OwwnersHelmet;