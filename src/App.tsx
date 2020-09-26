import React from 'react';
import styled from '@emotion/styled';
import GlobalStyles from './styles/globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Articles from './pages/Articles';

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page>
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
  padding: 50px 0 0 0;
  height: 100%;
`;
