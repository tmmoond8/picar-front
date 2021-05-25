import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import { MobxProvider } from './stores';
import * as serviceWorker from './serviceWorker';
import UiProvider from './components/UiProvider';

const Root: React.FC = () => (
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
  hydrate(<Root />, rootElement);
} else {
  render(<Root />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
