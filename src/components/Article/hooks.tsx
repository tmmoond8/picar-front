import React from 'react';
import Article from '../../types/Article';
import APIS from '../../apis';

import { useStore } from '../../stores';
import { useContextMenu } from '../ContextMenu';
import { useModal } from '../Modal';
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
      } catch (error) { }
    };
    if (!existingArticle && articleId) {
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
  const modal = useModal();

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
    modal.open({
      title: exitingArticle ? ' 글 수정' : '글 작성',
      noHeader: true,
      isFull: true,
      noBlur: true,
      contents: (
        <Editor
          article={exitingArticle}
          group={article.selectedGroup === '라운지' ? article.selectedLounge : article.selectedGroup}
          syncArticle={exitingArticle ? updateArticle : appendArticle}
          onClose={modal.close}
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

      contextMenu.open({
        targetElement: e.target as HTMLElement,
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
