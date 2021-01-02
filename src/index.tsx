import React from 'react';
import ReactDOM from 'react-dom';
import { IonApp } from '@ionic/react';
import App from './App';
import { MobxProvider } from './stores';
import * as serviceWorker from './serviceWorker';
import UiProvider from './components/UiProvider';

ReactDOM.render(
  <IonApp>
    <MobxProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </MobxProvider>
  </IonApp>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
