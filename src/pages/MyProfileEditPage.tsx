/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Page from './BasePage';
import Profile from '../components/Profile';

const ProfileEditPage = () => {
  return (
    <StyledPage>
      <Profile.Form />
    </StyledPage>
  );
}

export default ProfileEditPage;

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;