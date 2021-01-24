/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../styles';
import Page from './BasePage';
import { observer, useStore } from '../stores';
import Article from '../components/Article';
import {
  useFetch as useFetchArticle,
} from '../components/Article/hooks';

import CommentArea from '../components/Comment';

export default observer(function ArticlePage(): JSX.Element {
  const { article: articleStore, user } = useStore();

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

  const bookmark = React.useMemo(() => {
    return article?.id && user.bookmarks.has(article.id);
  }, [article, user.bookmarks]);

  return (
    <Page>
      <ArticleContainer className="ArticleContainer">
        {article && article.isDelete && <Article.Empty />}
        {article && !article.isDelete && (
          <React.Fragment>
            {/* <Article.Header bookmark={!!bookmark} breadbump="ad" onBookmark={handleClickBookmark} onMore={handleClickMore}/> */}
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
      </ArticleContainer>
    </Page>
  );
});

const ArticleContainer = styled.div`
  height: calc(100% - 56px);
  background-color: ${colors.white};
  overflow-y: scroll;
`;
