import React from 'react';
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
      article.articles = article.articles.map((article) => article.id === newArticle.id ? newArticle : article);
    },
    [article.articles],
  );
  const appendArticle = React.useCallback(
    (newArticle: Article) => {
      article.articles = [newArticle, ...article.articles];
    },
    [article.articles],
  );
  return (exitingArticle?: Article) =>
    bottomSheet.open({
      title: exitingArticle ? ' 글 수정' : '글 작성',
      isFull: true,
      contents: (
        <Editor
          article={exitingArticle}
          syncArticle={exitingArticle ? updateArticle : appendArticle}
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
