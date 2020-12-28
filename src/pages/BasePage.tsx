/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import cx from 'classnames';
import { useStore, observer } from '../stores';
import { useSetupHistory } from '../hooks';
import Layout from '../components/Layout';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui } = useStore();
  useSetupHistory();

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
  height: 100%;
`;
