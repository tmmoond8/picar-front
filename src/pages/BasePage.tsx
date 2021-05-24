/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Plugins } from '@capacitor/core';

import cx from 'classnames';
import APIS from '../apis';
import storage from '../modules/localStorage';
import { useStore, observer } from '../stores';
import { useSetupHistory, useAndroid } from '../hooks';
import GA from '../modules/ga';
import Layout from '../components/Layout';
import LoginBox from '../components/Login/LoginBox';
import { useLogin, LoginType } from '../hooks/auth';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui, util } = useStore();
  const { App } = Plugins;
  const { login } = useLogin();
  useSetupHistory();
  useAndroid();

  React.useEffect(() => {
    (async () => {
      const appState: any = await App.addListener('appStateChange', async ({ isActive }) => {
        const uuid = storage.getUUID();
        const provider = uuid && uuid.split('-')[0]
        if (isActive && uuid) {
          try {
            const {
              data: { tokens },
            } = await APIS.auth.checkUUID(uuid);
            storage.clearUUID();
            if (tokens) {
              login(provider as LoginType, tokens.accessToken, tokens.refreshToken)
              return;
            }
          } catch (error) {
            return;
          }
        }
      });
    })();
  }, [App])

  React.useEffect(() => {
    const { pathname, search, hash } = util.history.location;
    GA.trackPageView({ path: `${pathname}${search}${hash}` });
  }, [
    util.history.location.pathname,
    util.history.location.search,
    util.history.location.hash
  ]);

  return (
    <React.Fragment>
      <HiddenAreay>
        <LoginBox onClose={() => { }} />
      </HiddenAreay>
      {ui.queryMatch.Mobile && (
        <Page className={cx(className, 'MobilePage')}>{children}</Page>
      )}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && (
        <Page className={cx(className, 'TabletPage')}>
          <Layout.Tablet>{children}</Layout.Tablet>
        </Page>
      )}
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
  z-index: -10000000;
  opacity: 0;
`;