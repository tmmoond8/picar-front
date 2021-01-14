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
  const { user} = useStore();
  const HeaderOption = {
    title: '나의 활동',
    noBottomLine: true,
  }
  return (
    <StyledPage>
      <BackHeader options={HeaderOption} />
      <Activations userCode={user.profile.code} tab={(location?.state as Record<string, any>).menu ?? 'comment'}/>
    </StyledPage>
  )
}
export default observer(MyActivationsPage);

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Activations = styled(ActivationsContainer)`
  flex: 1;
`;