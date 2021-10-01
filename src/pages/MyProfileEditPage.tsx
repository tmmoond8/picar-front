/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Page from './BasePage';
import ProfileModificationForm from '../components/Profile/ModificationForm';

const ProfileEditPage = () => {
  return (
    <StyledPage>
      <ProfileModificationForm />
    </StyledPage>
  );
};

export default ProfileEditPage;

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;
