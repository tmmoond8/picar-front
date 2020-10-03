/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useParams, useHistory } from 'react-router';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import APIS from '../apis';

import Icon from '../components/Icon';
import { colors } from '../styles';

interface ArticlePageParams {
  articleId: string;
}

export default observer(function ArticlePage(): JSX.Element {
  const { ui } = useStore();
  const handleClickBookmark = () => {
    console.log('bookmark');
  };
  ui.setHeaderBack({
    right: (
      <Icon
        color={colors.black100}
        icon="bookmark"
        size="24px"
        onClick={handleClickBookmark}
      />
    ),
  });
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
