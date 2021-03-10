import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MobxProvider } from './stores';
import * as serviceWorker from './serviceWorker';
import UiProvider from './components/UiProvider';
import Helmet from './components/OwwnersHelmet';

ReactDOM.render(
  <React.StrictMode>
    <Helmet />
    <MobxProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </MobxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
