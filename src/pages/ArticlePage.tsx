/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../styles';
import Page from './BasePage';
import { observer, useStore } from '../stores';
import Icon from '../components/Icon';
import Article from '../components/Article';
import BackHeader from '../components/Header/BackHeader';
import {
  useFetch as useFetchArticle,
  useMoreMenu,
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

  const handleClickMore = useMoreMenu(article);

  const bookmark = React.useMemo(() => {
    return article?.id && user.bookmarks.has(article.id);
  }, [article, user.bookmarks]);

  const handleClickBookmark = React.useCallback(async () => {
    if (user.needLogin() || !article) {
      return;
    }
    if (bookmark) {
      user.removeBookmark(article.id);
    } else {
      user.addBookmark(article.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark, article]);

  const isYourArticle = React.useMemo(
    () => article?.author.code === user.profile.code,
    [article, user],
  );

  const HeaderOption = {
    right: (
      <React.Fragment>
        <Icon
          color={bookmark ? colors.black33 : 'transparent'}
          icon="bookmarkOutline"
          size="24px"
          onClick={handleClickBookmark}
        />
        {isYourArticle && (
          <Icon
            icon="more"
            color={colors.black33}
            size="24px"
            onClick={handleClickMore}
          />
        )}
      </React.Fragment>
    ),
  };

  return (
    <Page>
      <BackHeader options={HeaderOption} />
      <ArticleContainer>
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
      </ArticleContainer>
    </Page>
  );
});

const ArticleContainer = styled.div`
  height: calc(100% - 56px);
  overflow-y: scroll;
`;
