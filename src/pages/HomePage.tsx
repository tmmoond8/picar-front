/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import Page from './BasePage';
import { observer, useStore } from '../stores';
import { constants } from '../styles';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import _MenuBar from '../components/MenuBar';
import NavigationHeader from '../components/Header/NavigationHeader';
import { CAROUSEL, LOUNGE, LOUNGE_NAMES } from '../types/constants';

const HomePage = () => {
  const { ui } = useStore();

  return (
    <Page>
      {ui.queryMatch.Mobile && <MobileHome />}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && <TabletHome />}
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
            name={LOUNGE}
            articles={article.loungeArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.ALL}
            articles={article.articles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.FREE}
            articles={article.freeArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.CHARGMENT}
            articles={article.chargementArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.SHOW_OFF}
            articles={article.showOffArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
        </Carousel>
      </Wrapper>
      <MenuBar />
    </React.Fragment>
  );
});

const Wrapper = styled.main`
  height: calc(100% - 56px);
  padding-bottom: 56px;
`;

const TabletHome = observer(() => {
  const { article, user, ui } = useStore();
  ui.scrollableElementSelector = `.ArticleList[data-id="${article.selectedGroup}"]`;
  return (
    <React.Fragment>
      <NavigationHeader underline />
      {article.selectedGroup === LOUNGE && <ArticleList articles={article.loungeArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE} />}
      {article.selectedGroup === '전체' && <ArticleList articles={article.articles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.ALL} />}
      {article.selectedGroup === '자유' && <ArticleList articles={article.freeArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.FREE} />}
      {article.selectedGroup === '충전' && <ArticleList articles={article.chargementArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.CHARGMENT} />}
      {article.selectedGroup === '뽐뿌' && <ArticleList articles={article.showOffArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.SHOW_OFF} />}
    </React.Fragment>
  );
});

const MenuBar = styled(_MenuBar)`
  position: fixed;
  bottom: ${constants.safeBottom};
  left: 0;
`