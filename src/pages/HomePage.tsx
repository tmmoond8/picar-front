/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import Page from './BasePage';
import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';
import NavigationHeader from '../components/Header/NavigationHeader';
import { CAROUSEL } from '../types/constants';

const HomePage = () => {
  const { ui } = useStore();

  return (
    <Page>
      {ui.queryMatch.Mobile && <MobileHome />}
      {ui.queryMatch.Tablet && <TabletHome />}
      {ui.queryMatch.Desktop && <DesktopHome />}
    </Page>
  );
};

export default observer(HomePage);

const MobileHome = observer(() => {
  const { article, user } = useStore();
  const ref = React.useRef(null);

  const handleChangeIndex = React.useCallback(
    (index: number) => {
      article.groupIndex = index;
    },
    [article],
  );

  return (
    <React.Fragment>
      <NavigationHeader />
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
    </React.Fragment>
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

const TabletHome = observer(() => {
  const { article, user } = useStore();

  return (
    <ArticleList articles={article.loungeArticles} bookmarks={user.bookmarks} />
  );
});
