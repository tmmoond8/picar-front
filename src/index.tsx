import React from 'react';
import styled from '@emotion/styled';
import { hydrate, render } from 'react-dom';
import App from './App';
import { MobxProvider } from './stores';
import * as serviceWorker from './serviceWorker';
import UiProvider from './components/UiProvider';

const OwwnersApp: React.FC<{ isPreRender?: boolean }> = ({ isPreRender = false }) => (
  <React.StrictMode>
    <MobxProvider>
      <UiProvider>
        <App isPreRender={isPreRender} />
      </UiProvider>
    </MobxProvider>
  </React.StrictMode>
)

const rootElement = document.getElementById("root");
if (rootElement!.hasChildNodes()) {
  // 일반 렌더
  hydrate(<OwwnersApp isPreRender={false} />, rootElement);
} else {
  // 프리렌더
  render(<OwwnersApp isPreRender={true} />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
