/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router';

import { colors } from '../styles';
import Page from './BasePage';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import ArticleModel from '../types/Article';
import ArticleErrorMessage from '../components/Article/ArticleErrorMessage';
import APIS from '../apis';
import { useFetch as useFetchArticle } from '../components/Article/hooks';

import CommentArea from '../components/Comment';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { article: articleStore, user, ui, util } = useStore();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const history = util.useHistory();

  const [article, setArticle] = React.useState<ArticleModel | undefined>(
    undefined,
  );
  ui.scrollableElementSelector = '.ArticleContainer';
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

    const picarData = (window as any).__picar__;
    if (picarData && picarData.article) {
      if (picarData.article.id.toString() === articleId) {
        setArticle(picarData.article);
        return;
      }
    }
    (async () => {
      const {
        data: { ok, data },
      } = await APIS.article.get(articleId);
      if (ok) {
        setErrorMessage(null);
        setArticle(data);
        if (data.isDelete) {
          setErrorMessage('앗! 삭제된 게시물입니다.');
        }
      } else {
        setErrorMessage('게시글을 찾을 수 없습니다.');
        const timer = setTimeout(() => {
          history.goBack();
        }, 2000);
        return () => clearTimeout(timer);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  React.useEffect(() => {
    const found = articleStore.articles.find(
      (article) => article.id.toString() === articleId,
    );
    setArticle(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleStore.articles]);

  return (
    <Page>
      <ArticleContainer
        className="ArticleContainer"
        desktop={!ui.queryMatch.Mobile}
      >
        {errorMessage && <ArticleErrorMessage message={errorMessage} />}
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
  background-color: ${colors.white};
  overflow-y: auto;
  height: 100%;
  // FIXME 리다이렉션 동작 체킹
  & > [class*='ArticleHeader'] {
    /* position: absolute; */
    /* top: 0; */
    width: 100%;
    background-color: ${colors.white};
    /* z-index: 1000; */
  }
`;
