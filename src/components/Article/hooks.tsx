import React, { Dispatch, SetStateAction } from 'react';
import Article from '../../types/Article';
import APIS from '../../apis';
import Icon from '../Icon';

import { colors } from '../../styles';
import { useStore } from '../../stores';
import UiStore from '../../stores/uiStore';
import { UserStoreInterface } from '../../stores/userStore';
import { useContextMenu } from '../ContextMenu';
import { useBottomSheet } from '../BottomSheet';
import Editor from '../Editor';

export const useFetch = (
  articleId: number | string,
  existingArticle?: Article,
): Article | undefined => {
  const [article, setArticle] = React.useState<Article | undefined>(
    existingArticle,
  );
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
        } = await APIS.article.get(articleId);
        setArticle(data);
      } catch (error) {}
    };
    if (!existingArticle) {
      fetch();
    }
  }, [articleId, existingArticle]);

  return article;
};

export function useHeaderMenu(params: {
  ui: UiStore;
  article?: Article;
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

  React.useEffect(() => {
    if (ui && article) {
      if (article.isDelete) {
        ui.setHeaderBack({});
      } else {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYourArticle, bookmark]);
}

const useArticleRemove = (handleClose: () => void) => {
  return React.useCallback(
    async (articleId?: number) => {
      if (!articleId) {
        return;
      }
      try {
        const {
          data: { ok },
        } = await APIS.article.remove(articleId);
        if (ok) {
          window.location.reload(false);
        }
      } catch (error) {
        console.log(error);
      }
      handleClose();
    },
    [handleClose],
  );
};

export const useOpenArticleEditor = () => {
  const { article } = useStore();
  const bottomSheet = useBottomSheet();

  const updateArticle = React.useCallback(
    (newArticle: Article) => {
      article.articles = article.articles.map((article) =>
        article.id === newArticle.id ? newArticle : article,
      );
    },
    [article.articles],
  );
  return (exitingArticle: Article) =>
    bottomSheet.open({
      title: ' 글 수정',
      headerType: 'close',
      isFull: true,
      contents: (
        <Editor
          article={exitingArticle}
          syncArticle={updateArticle}
          onClose={bottomSheet.close}
        />
      ),
    });
};

export const useMoreMenu = (article?: Article) => {
  const contextMenu = useContextMenu();
  const openArticleEditor = useOpenArticleEditor();

  const handleClickRemove = useArticleRemove(contextMenu.close);
  return React.useCallback(
    (e: React.MouseEvent) => {
      if (!article) {
        return;
      }
      const {
        x,
        width,
        y,
        height,
      } = (e.target as HTMLElement).getBoundingClientRect();
      contextMenu.open({
        xPosition: x + width / 2,
        yPosition: y + height,
        menus: [
          {
            name: '수정하기',
            onClick: () => {
              contextMenu.close();
              openArticleEditor(article);
            },
          },
          {
            name: '삭제하기',
            onClick: () => handleClickRemove(article.id),
          },
        ],
      });
    },
    [article, contextMenu, handleClickRemove, openArticleEditor],
  );
};
