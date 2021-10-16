import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import AppDownloadPopUp from './components/AppDownloadPopup';
import GlobalStyles from './styles/globalStyles';
import { MobxProvider } from './stores';
import Header from './components/Header';
import UiProvider from './components/UiProvider';
import { useStore, observer } from './stores';
import PicarSuspense from './components/PicarSuspense';

const App: React.FC<{ isSSR?: boolean }> = ({ isSSR = false }) => {
  return (
    <React.StrictMode>
      <MobxProvider>
        <UiProvider>
          <GlobalStyles />
          <AppDownloadPopUp />
          <Routes isSSR={isSSR} />
        </UiProvider>
      </MobxProvider>
    </React.StrictMode>
  );
};

const HomePage = React.lazy(() => import('./pages/HomePage'));
const MyProfileEditPage = React.lazy(() => import('./pages/MyProfileEditPage'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfilePage'));
const NotionEmbedPage = React.lazy(() => import('./pages/NotionEmbedPage'));
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const MyActivationsPage = React.lazy(() => import('./pages/MyActivationsPage'));
const NotificationPage = React.lazy(() => import('./pages/NotificationPage'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const OwwnerPage = React.lazy(() => import('./pages/OwwnerPage'));

function Routes({ isSSR }: { isSSR: boolean }) {
  const { ui } = useStore();
  const Router: typeof StaticRouter | BrowserRouter = isSSR
    ? StaticRouter
    : BrowserRouter;

  return (
    <Router>
      <Page headerHeight={ui.header.height}>
        <Header {...ui.header} />
        <PicarSuspense>
          <Switch>
            <Route exact path="/myProfile/edit">
              <MyProfileEditPage />
            </Route>
            <Route exact path="/notice">
              <NotionEmbedPage {...notionPages.notice} />
            </Route>
            <Route path="/notion/:id">
              <NotionEmbedPage />
            </Route>
            <Route path="/qna">
              <NotionEmbedPage {...notionPages.qna} />
            </Route>
            <Route exact path="/myProfile">
              <MyProfilePage />
            </Route>
            <Route path="/news">
              <NewsPage />
            </Route>
            <Route exact path="/myActivations">
              <MyActivationsPage />
            </Route>
            <Route exact path="/test">
              <TestPage />
            </Route>
            <Route exact path="/owwner">
              <OwwnerPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/article/:articleId">
              <ArticlePage />
            </Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/notification">
              <NotificationPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </PicarSuspense>
      </Page>
    </Router>
  );
}

export default observer(App);

const Page = styled.div<{ headerHeight: number }>`
  height: 100%;
  overflow-y: hidden;
`;

const notionPages = {
  notice: { title: '공지사항', pageId: 'ae9ae015c5504dd886d3cc2af088c6f5' },
  qna: { title: '자주 묻는 질문', pageId: 'b070f0090c2f4391a002e49cb65a7a6d' },
};
