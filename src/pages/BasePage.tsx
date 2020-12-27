/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';

import cx from 'classnames';
import { useStore, observer } from '../stores';
import { useSetupHistory } from '../hooks';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  const { ui } = useStore();
  useSetupHistory();

  return (
    <React.Fragment>
      {ui.queryMatch.Mobile && (
        <MobilePage className={cx(className, 'MobilePage')}>
          {children}
        </MobilePage>
      )}
      {ui.queryMatch.Tablet && (
        <TabletPage className={cx(className, 'TabletPage')}>
          {children}
        </TabletPage>
      )}
    </React.Fragment>
  );
};

export default observer(BasePage);

const MobilePage = styled.div`
  height: 100%;
`;

const TabletPage = styled.div`
  height: 100%;
`;
