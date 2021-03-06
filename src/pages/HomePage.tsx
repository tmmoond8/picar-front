/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import Page from './BasePage';
import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';
import LoungeNavigation from '../components/LoungeNavigation';
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
            name={LOUNGE_NAMES.FREE}
            articles={article.freeArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.HUMOR}
            articles={article.humorArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.GOVERMENT}
            articles={article.govermentSupportArticles}
            bookmarks={user.bookmarks}
            showEmpty
          />
          <ArticleList
            name={LOUNGE_NAMES.FEEDBACK}
            articles={article.feedbackArticles}
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
      <LoungeNavigation.Tablet />
      {article.selectedGroup === LOUNGE && <ArticleList articles={article.loungeArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE}/>}
      {article.selectedGroup === '자유' && <ArticleList articles={article.freeArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.FREE}/>}
      {article.selectedGroup === '유머' && <ArticleList articles={article.humorArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.HUMOR}/>}
      {article.selectedGroup === '정부지원' && <ArticleList articles={article.govermentSupportArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.GOVERMENT}/>}
      {article.selectedGroup === '피드백' && <ArticleList articles={article.feedbackArticles} bookmarks={user.bookmarks} showEmpty name={LOUNGE_NAMES.FEEDBACK}/>}
    </React.Fragment>
  );
});