/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router';

import { colors } from '../styles';
import Page from './BasePage';
import { observer, useStore } from '../stores';
import Article from '../components/Article';
import APIS from '../apis';
import {
  useFetch as useFetchArticle,
} from '../components/Article/hooks';

import CommentArea from '../components/Comment';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { article: articleStore, user, ui } = useStore();

  const [article, setArticle] = React.useState(articleStore.articles.find(
    (article) =>
      article.id.toString() === articleId,
  ));
  ui.scrollableElementSelector = `.ArticleContainer`;
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

  React.useEffect(() => {
    if (!articleId) {
      return;
    }
    (async () => {
      const { data: { ok, data } } = await APIS.article.get(articleId);
      if (ok) {
        setArticle(data);
      }
    })()
  }, [articleId])

  return (
    <Page>
      <ArticleContainer className="ArticleContainer" desktop={!ui.queryMatch.Mobile}>
        {article && (
          <React.Fragment>
            <Article article={article} commentCount={commentCount} />
            {article?.id && article && !article.isDelete && (
              <CommentArea
                articleId={article.id}
                setCommentCount={setCommentCount}
                userCode={user.profile.code}
                articleAuthorCode={article.author.code}
                profilePhoto={user.profile.profileImage}
                showCount={!ui.queryMatch.Mobile}
              />
            )}
          </React.Fragment>
        )}
      </ArticleContainer>
    </Page>
  );
};

export default observer(ArticlePage);

const ArticleContainer = styled.div<{ desktop: boolean }>`
  height: 100%;
  background-color: ${colors.white};
  padding: 60px 0 0 0;
  overflow-y: auto;

  & > [class*="ArticleHeader"] {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: ${colors.white};
    z-index: 1000;
  }
`;
