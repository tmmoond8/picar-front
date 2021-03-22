import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';
import { useStore, observer } from './stores';
import env from './env';

function App() {
  const { ui } = useStore();
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Page headerHeight={ui.header.height}>
          <Header {...ui.header} />
          {env.REACT_APP_DEV && (
            <Location>
              <p>{window.location.href}</p>
            </Location>
            )
          }
          <Switch>
            <Route exact path="/myProfile/edit">
              <Pages.MyProfileEditPage />
            </Route>
            <Route exact path="/notice">
              <Pages.NotionEmbedPage {...notionPages.notice}/>
            </Route>
            <Route path="/notion/:id">
              <Pages.NotionEmbedPage />
            </Route>
            <Route path="/qna">
              <Pages.NotionEmbedPage {...notionPages.qna}/>
            </Route>
            <Route exact path="/myProfile">
              <Pages.MyProfilePage />
            </Route>
            <Route exact path="/myActivations">
              <Pages.MyActivationsPage />
            </Route>
            <Route exact path="/test">
              <Pages.TestPage />
            </Route>
            <Route exact path="/owwner">
              <Pages.OwwnerPage />
            </Route>
            <Route exact path="/login">
              <Pages.LoginPage />
            </Route>
            <Route exact path="/article/:articleId">
              <Pages.ArticlePage />
            </Route>
            <Route exact path="/search">
              <Pages.SearchPage />
            </Route>
            <Route exact path="/notification">
              <Pages.NotificationPage />
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

const notionPages = {
  notice: { title: '공지사항', pageId: 'd7e6d7a18ec849b3b543e7389b0bd5fe'},
  qna: { title: '자주 묻는 질문', pageId: '2fbdb025be1c45748504f74d33eda2d3'}
}

const Location = styled.div`
  position: fixed;
  top: 40px;
  left: 20px;
  font-size: 10px;
  color: rgba(100, 100, 100, 0.5);
  z-index: 1000000;
`;