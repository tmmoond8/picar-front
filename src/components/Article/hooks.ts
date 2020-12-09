import React, { Dispatch, SetStateAction } from 'react';
import ArticleType from '../../types/Article';
import APIS from '../../apis';

export const useFetch = (articleId: number | string): [ArticleType | null, Dispatch<SetStateAction<ArticleType | null>>] => {
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
  }, [articleId])

  return [
    articles,
    setArticles,
  ]
}
