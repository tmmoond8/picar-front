/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import React from 'react';

import Page from './BasePage'
import BackHeader from '../components/Header/BackHeader';
import ActivationsContainer from '../components/Profile/ActivationsContainer';
import { useStore, observer } from '../stores';

const MyActivationsPage: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const { user, util} = useStore();
  const HeaderOption = {
    title: '나의 활동',
    noBottomLine: true,
  }
  return (
    <Page>
      <BackHeader options={HeaderOption} />
      <ActivationsContainer userCode={user.profile.code} tab={(location?.state as Record<string, any>).menu ?? 'comment'}/>
    </Page>
  )
}
export default observer(MyActivationsPage);

