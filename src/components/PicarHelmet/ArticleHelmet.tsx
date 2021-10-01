import React from 'react';
import BaseHelmet from '.';

export type Header = {
  title: string;
  description: string;
  image: string;
  favicon: string;
  url: string;
};

const ArticleHelmet: React.FC<Pick<Header, 'title' | 'description' | 'image'>> =
  ({ title, description, image: propImage }) => {
    const image = propImage ? propImage.split(',')[0] : undefined;
    return <BaseHelmet title={title} description={description} image={image} />;
  };

export default ArticleHelmet;
