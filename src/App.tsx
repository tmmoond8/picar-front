import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page>
          <Header />
          <Switch>
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

export default App;

const Page = styled.div`
  padding: 56px 0 0 0;
  height: 100%;
`;
