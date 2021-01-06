/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Profile from './Profile';
import APIS from '../../apis';
import { Profile as ProfileType } from '../../types/User';

const ProfileContainer: React.FC<{ userCode: string}> = ({ userCode = "phupdv3yb" }) => {
  const [user, setUser] = React.useState<ProfileType | null>(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await APIS.user.get(userCode);
      if (data.ok) {
        setUser(data.user);
      }
    })();
  }, [])


  return (
    <Container>
      {user && <Profile {...user}/>}
    </Container>
  )
}

export default ProfileContainer;

const Container = styled.div``;