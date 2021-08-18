import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppDownloadPopUp from './components/AppDownloadPopup';
import { constants } from './styles';
import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import { MobxProvider } from './stores';
import Header from './components/Header';
import UiProvider from './components/UiProvider';
import { useStore, observer } from './stores';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <MobxProvider>
        <UiProvider>
          <GlobalStyles />
          <AppDownloadPopUp />
          <Routes />
        </UiProvider>
      </MobxProvider>
    </React.StrictMode>
  );
}


function Routes() {
  const { ui } = useStore();

  return (
    <Router>
      <Page headerHeight={ui.header.height}>
        <Header {...ui.header} />
        <Switch>
          <Route exact path="/myProfile/edit">
            <Pages.MyProfileEditPage />
          </Route>
          <Route exact path="/notice">
            <Pages.NotionEmbedPage {...notionPages.notice} />
          </Route>
          <Route path="/notion/:id">
            <Pages.NotionEmbedPage />
          </Route>
          <Route path="/qna">
            <Pages.NotionEmbedPage {...notionPages.qna} />
          </Route>
          <Route exact path="/myProfile">
            <Pages.MyProfilePage />
          </Route>
          <Route path="/news">
            <Pages.NewsPage />
          </Route>
          <Route exact path="/prerendering">
              <Pages.PreRenderingPage />
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
  )
}

export default observer(App);

const Page = styled.div<{ headerHeight: number }>`
  height: 100%;
  overflow-y: hidden;
`;

const notionPages = {
  notice: { title: '공지사항', pageId: 'ae9ae015c5504dd886d3cc2af088c6f5' },
  qna: { title: '자주 묻는 질문', pageId: 'b070f0090c2f4391a002e49cb65a7a6d' }
}

const Location = styled.div`
  position: fixed;
  top: calc(${constants.safeTop} + 40px);
  left: 20px;
  font-size: 10px;
  color: rgba(100, 100, 100, 0.5);
  z-index: 1000000;
`;