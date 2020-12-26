/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Profile as UserProfile } from '../types/User';
import LoginBox from '../components/Login/LoginBox';
import { useBottomSheet } from '../components/BottomSheet';
import { useStore, observer } from '../stores';
import OwwnersLogo from '../resources/images/owwners-logo.png';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default observer(function ProfilePage(): JSX.Element {
  const { user, ui } = useStore();
  ui.setHeaderNone();
  const bottomSheet = useBottomSheet();
  const handleSetUserProfile = (profile: UserProfile) => {
    // user.profile = profile;
    user.setProfile(profile);
  };

  return (
    <Page>
      <LoginBox
        onClose={bottomSheet.close}
        onSetUserProfile={handleSetUserProfile}
      />
      <FullLoading>
        <img src={OwwnersLogo} />
      </FullLoading>
    </Page>
  );
});

const FullLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;

  img {
    width: 172px;
  }
`;
