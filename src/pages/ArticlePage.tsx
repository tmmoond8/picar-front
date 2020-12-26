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
import { useContextMenu } from '../components/ContextMenu';

export default observer(function ArticlePage(): JSX.Element {
  const { ui, user } = useStore();
  const [article, setArticle] = useFetchArticle(
    window.location.pathname.split('/').pop() as string,
  );

  const [commentCount, setCommentCount] = React.useState(0);

  React.useEffect(() => {
    if (article) {
      setCommentCount(article.commentCount);
    }
  }, [article]);

  const handleClickMore = useMoreMenu(article?.id);

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
