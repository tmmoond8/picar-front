import React, { Dispatch, SetStateAction } from 'react';
import ArticleType from '../../types/Article';
import APIS from '../../apis';
import Icon from '../Icon';

import { colors } from '../../styles';
import UiStore from '../../stores/uiStore';
import { UserStoreInterface } from '../../stores/userStore';

export const useFetch = (
  articleId: number | string,
): [ArticleType | null, Dispatch<SetStateAction<ArticleType | null>>] => {
  const [articles, setArticles] = React.useState<ArticleType | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await APIS.article.get(
          window.location.pathname.split('/').pop() as string,
        );
        setArticles(data);
      } catch (error) {}
    })();
  }, [articleId]);

  return [articles, setArticles];
};

export function useHeaderMenu(params: {
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
