/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router';

import { colors } from '../styles';
import Page from './BasePage';
import { observer, useStore } from '../stores';
import Article from '../components/Article';
import {
  useFetch as useFetchArticle,
} from '../components/Article/hooks';

import CommentArea from '../components/Comment';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string}>();
  const { article: articleStore, user, ui } = useStore();

  const article = articleStore.articles.find(
    (article) =>
      article.id.toString() === articleId,
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

  return (
    <Page>
      <ArticleContainer className="ArticleContainer" desktop={!ui.queryMatch.Mobile}>
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
                profilePhoto={user.profile.profileImage}
              />
            )}
          </React.Fragment>
        )}
      </ArticleContainer>
    </Page>
  );
};

export default observer(ArticlePage);

const ArticleContainer = styled.div<{ desktop: boolean}>`
  height: calc(100% - 56px);
  background-color: ${colors.white};
  overflow-y: auto;
  ${p => p.desktop && css`
    height: 100%;  
  `}
`;
