import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';
import { useStore, observer } from './stores';

function App() {
  const {
    ui: { header },
  } = useStore();

  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page headerHeight={header.height}>
          <Header {...header} />
          <Switch>
            <Route path="/test">
              <Pages.TestPage />
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
  padding-top: ${(p) => p.headerHeight}px;
  height: 100%;
`;
