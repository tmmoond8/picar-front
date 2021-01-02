import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import GlobalStyles from './styles/globalStyles';
import * as Pages from './pages';
import Header from './components/Header';
import { useStore, observer } from './stores';

function App() {
  const { ui } = useStore();
  return (
    <React.Fragment>
      <GlobalStyles />
      <IonReactRouter>
        <Page headerHeight={ui.header.height}>
          <Header {...ui.header} />
          <IonRouterOutlet>
            <Route exact path="/profile" component={Pages.ProfilePage}/>
            <Route exact path="/test" component={Pages.TestPage}/>
            <Route exact path="/login" component={Pages.LoginPage}/>
            <Route exact path="/article/:articleId" component={Pages.ArticlePage}/>
            <Route exact path="/" component={Pages.HomePage}/>
          </IonRouterOutlet>
        </Page>
      </IonReactRouter>
    </React.Fragment>
  );
}

export default observer(App);

const Page = styled.div<{ headerHeight: number }>`
  height: 100%;
  overflow-y: hidden;
`;
