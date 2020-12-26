/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import { useFetch as useFetchArticle } from '../components/Article/hooks';

import CommentArea from '../components/Comment';
import Icon from '../components/Icon';
import { useContextMenu } from '../components/ContextMenu';
import ArticleType from '../types/Article';
import { Profile as UserProfile } from '../types/User';
import { colors } from '../styles';
import UiStore from '../stores/uiStore';
import { UserStoreInterface } from '../stores/userStore';

export default observer(function ArticlePage(): JSX.Element {
  const { ui, user } = useStore();
  const { pathname } = useLocation();
  const [article, setArticle] = useFetchArticle(
    window.location.pathname.split('/').pop() as string,
  );
  const contextMenu = useContextMenu();
  const [commentCount, setCommentCount] = React.useState(0);

  React.useEffect(() => {
    if (article) {
      setCommentCount(article.commentCount);
    }
  }, [article]);

  const handleClickMore = React.useCallback(
    (e: React.MouseEvent) => {
      contextMenu.open({
        xPosition: 0,
        yPosition: 0,
        menus: [
          { name: '수정하기', onClick: () => console.log('수정') },
          { name: '삭제하기', onClick: () => console.log('삭제') },
        ],
      });
    },
    [contextMenu],
  );

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useHeaderMenu({
    ui,
    user,
    article,
    handleClickMore,
  });

  return (
    <React.Fragment>
      {article && <Article article={article} commentCount={commentCount} />}

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

function useHeaderMenu(params: {
  ui: UiStore;
  article: ArticleType | null;
  user: UserStoreInterface;
  handleClickMore: any;
}) {
  const { ui, article, user, handleClickMore } = params;

  const isYourArticle = React.useMemo(
    () => article?.author.code === user.profile.code,
    [article, user],
  );
  const bookmark = React.useMemo(() => {
    return article?.id && user.bookmarks.has(article.id);
  }, [article, user.bookmarks]);

  const handleClickBookmark = React.useCallback(async () => {
    if (user.needLogin() || article === null) {
      return;
    }
    if (bookmark) {
      user.removeBookmark(article.id);
    } else {
      user.addBookmark(article.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark, article]);

  React.useEffect(() => {
    if (ui) {
      ui.setHeaderBack({
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
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYourArticle, bookmark]);
}
