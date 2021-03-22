/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Plugins } from '@capacitor/core';

import cx from 'classnames';
import APIS from '../apis';
import storage from '../modules/localStorage';
import { useStore, observer } from '../stores';
import hooks, { useSetupHistory } from '../hooks';
import Layout from '../components/Layout';
import LoginBox from '../components/Login/LoginBox';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui, user } = useStore();
  const { App } = Plugins;
  const KakaoLogin = hooks.auth.useKakaoLogin();
  useSetupHistory();
  React.useEffect(() => {
    (async () => {
      const appState: any = await App.addListener('appStateChange', async ({ isActive }) => {
        const uuid = storage.getUUID();
        if (isActive && uuid) {
          try {
            const {
              data: { tokens },
            } = await APIS.auth.checkUUID(uuid);
            storage.clearUUID();
            if (tokens) {
              KakaoLogin(tokens.accessToken, tokens.refreshToken)
              return;
            }
          } catch (error) {
            return;
          }
        }
      });
    })();
  }, [App])

  return (
    <React.Fragment>
      {ui.queryMatch.Mobile && (
        <Page className={cx(className, 'MobilePage')}>{children}</Page>
      )}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && (
        <Page className={cx(className, 'TabletPage')}>
          <Layout.Tablet>{children}</Layout.Tablet>
        </Page>
      )}
      <HiddenAreay>
        <LoginBox onClose={() => {}}/>
      </HiddenAreay>
    </React.Fragment>
  );
};

export default observer(BasePage);

const Page = styled.div`
  overflow-y: hidden;
  height: 100%;

  &.MobilePage {
    padding: 
      env(safe-area-inset-top)
      env(safe-area-inset-right)
      env(safe-area-inset-bottom)
      env(safe-area-inset-left);
  }
`;

const HiddenAreay = styled.div`
  position: fixed;
  top: -1000px;
  left: -10000px;
`;