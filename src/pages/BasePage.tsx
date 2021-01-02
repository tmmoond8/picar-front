/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Plugins } from '@capacitor/core';

import cx from 'classnames';
import APIS from '../apis';
import { useStore, observer } from '../stores';
import { useSetupHistory } from '../hooks';
import Layout from '../components/Layout';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui, user } = useStore();
  const { App } = Plugins;
  useSetupHistory();
  React.useEffect(() => {
    (async () => {
      const appState: any = await App.addListener('appStateChange', async ({ isActive }) => {
        if (isActive) {
          const uuid = localStorage.getItem('OWWNERS_UUID') ?? '';
          try {
            const {
              data: { data },
            } = await APIS.auth.checkUUID(uuid);
            if (data) {
              user.setProfile(data);
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
      {ui.queryMatch.Tablet && (
        <Page className={cx(className, 'TabletPage')}>
          <Layout.Tablet>{children}</Layout.Tablet>
        </Page>
      )}

      {ui.queryMatch.Desktop && (
        <Page className={cx(className, 'DesktopPage')}>
          <Layout.Desktop>{children}</Layout.Desktop>
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
