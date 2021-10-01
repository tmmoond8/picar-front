import React from 'react';

export type Meta = {
  title: string;
  content: string;
  photos: string;
};

const r = (key: string, value: string) => {
  const h = document.querySelector('head');
  if (h) {
    const meta = h.querySelector<HTMLMetaElement>(`meta[${key}]`);
    if (meta) {
      meta.content = value;
    }
  }
};

const useOG = ({ title, content, photos }: Meta) => {
  const image = photos ? photos.split(',')[0] : null;
  React.useEffect(() => {
    const h = document.querySelector('head');
    if (h) {
      document.title = title;
    }
    r('name="description"', content);
    r('property="og:title"', title);
    r('property="og:description"', content);
    if (image) {
      r('property="og:image"', image);
    }
    r('property="twitter:title"', title);
    r('property="twitter:description"', content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useOG;
