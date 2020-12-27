/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import Page from './BasePage';
import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';
import { CAROUSEL } from '../types/constants';

const HomePage = () => {
  const { ui } = useStore();

  return (
    <Page>
      {ui.queryMatch.Mobile && <MobileHome />}
      {ui.queryMatch.Tablet && <DesktopHome />}
    </Page>
  );
};

export default observer(HomePage);

const MobileHome = observer(() => {
  const { article, ui, user } = useStore();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ui.setHeaderNavigation();
    }
    return () => {
      ui.setHeaderNone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const handleChangeIndex = React.useCallback(
    (index: number) => {
      article.groupIndex = index;
    },
    [article],
  );

  return (
    <Wrapper ref={ref}>
      <Carousel
        id={CAROUSEL.HOME}
        index={article.groupIndex}
        onChangeIndex={handleChangeIndex}
      >
        <ArticleList
          articles={article.loungeArticles}
          bookmarks={user.bookmarks}
        />
        <ArticleList
          articles={article.freeArticles}
          bookmarks={user.bookmarks}
        />
        <ArticleList
          articles={article.humorArticles}
          bookmarks={user.bookmarks}
        />
        <ArticleList
          articles={article.govermentSupportArticles}
          bookmarks={user.bookmarks}
        />
      </Carousel>
      <MenuBar />
    </Wrapper>
  );
});

const Wrapper = styled.main`
  height: 100%;
  padding-bottom: 56px;
`;

const DesktopHome = observer(() => {
  const { article, user } = useStore();

  return (
    <ArticleList articles={article.loungeArticles} bookmarks={user.bookmarks} />
  );
});
