import React from 'react';

import Emotion from '../../types/Emotion';
import Article from '../../types/Article';

export { observer } from 'mobx-react';

const ArticleContext = React.createContext<{
  article: Article | null;
  emotions: Emotion[];
  setEmotions: (emotions: Emotion[]) => void;
  commentCount: number;
  viewCount: number;
}>({
  article: null,
  emotions: [],
  setEmotions: () => {},
  commentCount: 0,
  viewCount: 0,
});

ArticleContext.displayName = 'ArticleContext';

export const useArticleContext = () => {
  return React.useContext(ArticleContext);
};

export default ArticleContext;