/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { observer, useStore } from '../stores';
import Article from '../components/Article';
import APIS from '../apis';
import { useInitBefore } from '../hooks';

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
  const history = useHistory();
  const [article, setArticle] = React.useState(null);
  const fetch = React.useCallback(async () => {
    try {
      const {
        data: { data },
      } = await APIS.article.get(
        window.location.pathname.split('/').pop() as string,
      );
      if (!data) {
        history.goBack();
      }
      setArticle(data);
    } catch (error) {}
  }, [history]);

  useInitBefore(fetch);

  return (
    <React.Fragment>
      {article && <Article article={article as any} />}
    </React.Fragment>
  );
});
