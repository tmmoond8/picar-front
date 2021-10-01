import React from 'react';

import Article from '../../types/Article';
import { EmotionCount } from '../../types/Emotion';

export { observer } from 'mobx-react';

const ArticleContext = React.createContext<{
  article: Article | null;
  commentCount: number;
  emotionCounts: EmotionCount[];
}>({
  article: null,
  commentCount: 0,
  emotionCounts: [],
});

ArticleContext.displayName = 'ArticleContext';

export const useArticleContext = () => {
  return React.useContext(ArticleContext);
};

export default ArticleContext;
