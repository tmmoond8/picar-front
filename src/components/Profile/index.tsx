import React from 'react';
import Squircle from '../Squircle';
import * as Whos from './Who';
import Profile from './Profile';
import Form from './ModificationForm';
import Header from './Header';
import * as StylingComponent from './StylingComponent';
import { useModal } from '../Modal';

export default {
  Photo: Squircle,
  Profile,
  Header,
  Form,
  useOpenProfile,
  ...Whos,
  ...StylingComponent,
};

type ProfileContainerImportType = typeof import("./ProfileContainer");
let DynamicProfileContainer: Promise<ProfileContainerImportType>;

function useOpenProfile() {
  const modal = useModal();

  const handleOpenProfile = React.useCallback((userCode: string) => {
    if (!DynamicProfileContainer) {
      DynamicProfileContainer = import('./ProfileContainer');  
    }
    DynamicProfileContainer.then((ProfileContainer: ProfileContainerImportType) => {
      modal.open({
        title: '',
        isFull: true,
        contents: (
          <ProfileContainer.default userCode={userCode}/>
        ),
      });
    })
  }, [modal])
  return handleOpenProfile;
}