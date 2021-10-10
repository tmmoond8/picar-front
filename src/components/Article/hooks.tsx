import React from 'react';
import { toast } from 'react-toastify';
import Article from '../../types/Article';
import { LOUNGE, LOUNGE_NAMES } from '../../types/constants';
import APIS from '../../apis';

import { useStore } from '../../stores';
import { useContextMenu } from '../ContextMenu';
import { useModal } from '../Modal';
import Editor from '../Editor';
import { useAlert } from '../Alert';

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
    if (!existingArticle && articleId) {
      fetch();
    }
  }, [articleId, existingArticle]);

  return article;
};

const useArticleRemove = (handleClose: () => void) => {
  const { util, article } = useStore();
  const alert = useAlert();

  return React.useCallback(
    async (articleId?: number) => {
      alert.open({
        title: '현재 글을 삭제하시겠습니까?',
        subtitle: '현재 글을 삭제하고 이전페이지로 돌아갑니다.',
        handleConfirm: async () => {
          if (!articleId) {
            return;
          }
          try {
            const {
              data: { ok },
            } = await APIS.article.remove(articleId);
            if (ok) {
              toast.success('글이 삭제 되었습니다.');
              article.articles = article.articles.filter(
                ({ id }) => articleId !== id,
              );
              util.history.goBack();
              // TODO 삭제된 글을 리스트에서도 삭제.
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
      handleClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose],
  );
};

export const useOpenArticleEditor = () => {
  const { article, user } = useStore();
  const modal = useModal();

  const updateArticle = React.useCallback(
    (newArticle: Article) => {
      article.articles = article.articles.map((article) =>
        article.id === newArticle.id ? newArticle : article,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [article.articles],
  );
  const appendArticle = React.useCallback(
    (newArticle: Article) => {
      article.articles = [newArticle, ...article.articles];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [article.articles],
  );

  const group = React.useMemo(() => {
    if (article.selectedGroup === LOUNGE) {
      return article.selectedLounge;
    }
    if (article.selectedGroup === LOUNGE_NAMES.ALL && user.profile.group) {
      return user.profile.group;
    }
    return article.selectedGroup;
  }, [article.selectedGroup, article.selectedLounge, user.profile.group]);

  return (exitingArticle?: Article) =>
    modal.open({
      title: exitingArticle ? ' 글 수정' : '글 작성',
      noHeader: true,
      isFull: true,
      noBlur: true,
      contents: (
        <Editor
          article={exitingArticle}
          group={group}
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
