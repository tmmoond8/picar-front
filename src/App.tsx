import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';
import { Profile as UserProfile } from './types/User';
import { useStore, observer } from './stores';
import BottomSheet from './components/BottomSheet';
import { useCheckLogin } from './hooks';

function App() {
  const { ui, user } = useStore();

  const bottomSheet = BottomSheet.useBottomSheet();
  const needLogin = useCheckLogin(
    (profile: UserProfile) => user.setProfile(profile),
    bottomSheet,
  );
  user.needLogin = () => needLogin(user.profile.code);

  return (
    <React.Fragment>
      <GlobalStyles />

      <Router>
        <Page headerHeight={ui.header.height}>
          <Header {...ui.header} />
          <Switch>
            <Route path="/profile">
              <Pages.ProfilePage />
            </Route>
            <Route path="/test">
              <Pages.TestPage />
            </Route>
            <Route path="/login">
              <Pages.LoginPage />
            </Route>
            <Route path="/article/:articleId">
              <Pages.ArticlePage />
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
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding-top: ${(p) => p.headerHeight}px;
  overflow: scroll;
`;
