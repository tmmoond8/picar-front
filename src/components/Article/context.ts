import React from 'react';

import Article from '../../types/Article';

export { observer } from 'mobx-react';

const ArticleContext = React.createContext<{
  article: Article | null;
  viewCount: number;
  commentCount: number;
}>({
  article: null,
  viewCount: 0,
  commentCount: 0,
});

ArticleContext.displayName = 'ArticleContext';

export const useArticleContext = () => {
  return React.useContext(ArticleContext);
};

export default ArticleContext;