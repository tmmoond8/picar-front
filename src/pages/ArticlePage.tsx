/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import {
  useFetch as useFetchArticle,
  useHeaderMenu,
  useMoreMenu,
} from '../components/Article/hooks';

import CommentArea from '../components/Comment';

export default observer(function ArticlePage(): JSX.Element {
  const { article: articleStore, ui, user } = useStore();

  const article = articleStore.articles.find(
    (article) =>
      article.id.toString() ===
      (window.location.pathname.split('/').pop() as string).toString(),
  );

  useFetchArticle(window.location.pathname.split('/').pop() as string, article);

  const [commentCount, setCommentCount] = React.useState(0);

  React.useEffect(() => {
    if (article) {
      setCommentCount(article.commentCount);
      articleStore.articles = articleStore.articles.map((articleItem) =>
        articleItem.id === article.id ? article : articleItem,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const handleClickMore = useMoreMenu(article);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useHeaderMenu({
    ui,
    user,
    article,
    handleClickMore,
  });

  return (
    <React.Fragment>
      {article && article.isDelete && <Article.Empty />}
      {article && !article.isDelete && (
        <React.Fragment>
          <Article article={article} commentCount={commentCount} />
          {article?.id && (
            <CommentArea
              articleId={article.id}
              setCommentCount={setCommentCount}
              userCode={user.profile.code}
              articleAuthorCode={article.author.code}
              profilePhoto={user.profile.thumbnail}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
});
