import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import { MobxProvider } from './stores';
import * as serviceWorker from './serviceWorker';
import UiProvider from './components/UiProvider';

const OwwnersApp = () => (
  <React.StrictMode>
    <MobxProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </MobxProvider>
  </React.StrictMode>
)

const rootElement = document.getElementById("root");
if (rootElement!.hasChildNodes()) {
  hydrate(<OwwnersApp />, rootElement);
} else {
  render(<OwwnersApp />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
