/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useParams, useHistory } from 'react-router';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import APIS from '../apis';

interface ArticlePageParams {
  articleId: string;
}

export default observer(function ArticlePage(): JSX.Element {
  const { articleId } = useParams<ArticlePageParams>();
  const history = useHistory();
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    (async function fetch() {
      try {
        const {
          data: { data },
        } = await APIS.article.get(articleId);
        if (!data) {
          history.goBack();
        }
        setArticle(data);
      } catch (error) {}
    })();
  }, [articleId, history]);
  return (
    <React.Fragment>
      {article && <Article article={article as any} />}
    </React.Fragment>
  );
});
