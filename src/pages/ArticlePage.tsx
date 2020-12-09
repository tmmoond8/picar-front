/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import { useCheckLogin } from '../hooks';
import { useFetch as useFetchArticle } from '../components/Article/hooks';
import { useFetch as useFetchEmotion } from '../components/Emotion/hooks';

import CommentArea from '../components/Comment';
import BottomSheet from '../components/BottomSheet';
import Icon from '../components/Icon';
import { colors } from '../styles';
import { Profile as UserProfile } from '../types/User';

export default observer(function ArticlePage(): JSX.Element {
  const { ui, article: articleStore, user } = useStore();
  const { pathname } = useLocation();
  const [_, __, articleId] = pathname.split('/');
  const [article, setArticle] = useFetchArticle(
    window.location.pathname.split('/').pop() as string,
  );
  const {
    emotions,
    setEmotions,
    yourEmotion: _yourEmotion,
    setYourEmotion,
  } = useFetchEmotion(articleId);
  const bottomSheet = BottomSheet.useBottomSheet();

  const [commentCount, setCommentCount] = React.useState(0);

  React.useEffect(() => {
    if (article) {
      setCommentCount(article.commentCount);
    }
  }, [article]);

  const needLogin = useCheckLogin(
    (profile: UserProfile) => (user.profile = profile),
    bottomSheet,
  );

  const bookmark = React.useMemo(() => {
    return articleId && articleStore.bookmarks.has(parseInt(articleId));
  }, [articleId, articleStore.bookmarks]);

  const handleClickBookmark = React.useCallback(async () => {
    if (needLogin(user.profile.code)) {
      return;
    }
    if (bookmark) {
      articleStore.removeBookmark(parseInt(articleId));
    } else {
      articleStore.addBookmark(parseInt(articleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          article={article}
          commentCount={commentCount}
          emotions={emotions}
          setEmotions={setEmotions}
        />
      )}

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
  );
});
