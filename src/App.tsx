import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';
import { useStore, observer } from './stores';

function App() {
  const { ui } = useStore();
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page headerHeight={ui.header.height}>
          <Header {...ui.header} />
          <Switch>
            <Route path="/myProfile">
              <Pages.MyProfilePage />
            </Route>
            <Route path="/test">
              <Pages.TestPage />
            </Route>
            <Route path="/login/kakao">
              <Pages.KakaoLoginBridge />
            </Route>
            <Route path="/login">
              <Pages.LoginPage />
            </Route>
            <Route path="/article/:articleId">
              <Pages.ArticlePage />
            </Route>
            <Route path="/search">
              <Pages.SearchPage />
            </Route>
            <Route path="/">
              <Pages.HomePage />
            </Route>
          </Switch>
        </Page>
      </Router>
    </React.Fragment>
  );
}

export default observer(App);

const Page = styled.div<{ headerHeight: number }>`
  height: 100%;
  overflow-y: hidden;
`;
