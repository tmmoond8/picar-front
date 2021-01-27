/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Page from './BasePage';
import BackHeader from '../components/Header/BackHeader';
import Profile from '../components/Profile';
import { useStore, observer } from '../stores';

const ProfileEditPage = () => {
  const { ui } = useStore();
  return (
    <StyledPage>
      {ui.queryMatch.Mobile && <BackHeader options={{ title: "프로필 수정" }} />}
      <Profile.Form />
    </StyledPage>
  );
}

export default observer(ProfileEditPage);

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;