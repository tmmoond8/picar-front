/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import cx from 'classnames';
import { useStore, observer } from '../stores';
import { useSetupHistory, useAndroid, useGlobalEvents } from '../hooks';
import GA from '../modules/ga';
import Layout from '../components/Layout';
import LoginBox from '../components/Login/LoginBox';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui, util } = useStore();

  useGlobalEvents();
  useSetupHistory();
  useAndroid();

  React.useEffect(() => {
    const { pathname, search, hash } = util.history.location;
    GA.trackPageView({ path: `${pathname}${search}${hash}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    util.history.location.pathname,
    util.history.location.search,
    util.history.location.hash,
  ]);

  return (
    <React.Fragment>
      <HiddenArea>
        <LoginBox onClose={() => {}} />
      </HiddenArea>
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
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
`;

const HiddenArea = styled.div`
  position: fixed;
  z-index: -10000000;
  opacity: 0;
`;
