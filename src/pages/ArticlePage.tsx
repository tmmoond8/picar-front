/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import APIS from '../apis';
import { useInitBefore } from '../hooks';

import CommentArea from '../components/Comment';
import Icon from '../components/Icon';
import { colors } from '../styles';
import ArticleType from '../types/Article';

export default observer(function ArticlePage(): JSX.Element {
  const { ui, article: articleStore, user } = useStore();
  const { pathname } = useLocation();
  const [_, __, articleId] = pathname.split('/');

  const history = useHistory();
  const [article, setArticle] = React.useState<ArticleType | null>(null);

  const [commentCount, setCommentCount] = React.useState(0);
  const [emotionCount, setEmotionCount] = React.useState(0);

  React.useEffect(() => {
    if (article) {
      setCommentCount(article.commentCount);
      setEmotionCount(article.emotionCount);
    }
  }, [article]);

  const fetch = React.useCallback(async () => {
    try {
      const {
        data: { data },
      } = await APIS.article.get(
        window.location.pathname.split('/').pop() as string,
      );
      if (!data) {
        history.goBack();
      }
      setArticle(data);
    } catch (error) {}
  }, [history]);

  useInitBefore(fetch);

  const bookmark = React.useMemo(() => {
    return articleId && articleStore.bookmarks.has(parseInt(articleId));
  }, [articleId, articleStore.bookmarks]);

  const handleClickBookmark = React.useCallback(() => {
    if (bookmark) {
      articleStore.removeBookmark(parseInt(articleId));
    } else {
      articleStore.addBookmark(parseInt(articleId));
    }
  }, [bookmark, articleStore, articleId]);
  React.useEffect(() => {
    if (ui) {
      ui.setHeaderBack({
        right: (
          <Icon
            color={bookmark ? colors.black33 : 'transparent'}
            icon="bookmarkOutline"
            size="24px"
            onClick={handleClickBookmark}
          />
        ),
      });
    }
  }, [ui, bookmark, handleClickBookmark]);

  return (
    <React.Fragment>
      {article && (
        <Article
          article={article as ArticleType}
          commentCount={commentCount}
          emotionCount={emotionCount}
        />
      )}

      {article?.id && (
        <CommentArea
          articleId={article.id}
          setCommentCount={setCommentCount}
          profilePhoto={user.profile.thumbnail}
        />
      )}
    </React.Fragment>
  );
});
