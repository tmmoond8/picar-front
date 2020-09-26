import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import Articles from './pages/Articles';
import Header from './components/Header';

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page>
          <Header />
          <Switch>
            <Route path="/article">
              <Articles />
            </Route>
            <Route path="/">
              <Articles />
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
