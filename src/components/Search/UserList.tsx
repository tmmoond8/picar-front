/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { Profile as ProfileType } from '../../types/User';
import { colors } from '../../styles';
import Profile from '../Profile';

const UserList: React.FC<{ users: ProfileType[] }> = ({ users }) => {
  return (
    <List className="UserList">
      {users.map(({ code, profileImage, name, group }) => (
        <User key={code}>
          <Profile.Photo src={profileImage} size={48} />
          <Profile.Who name={name} group={group} />
        </User>
      ))}
    </List>
  )
}

const List = styled.ol`
  width: 100%;
  height: 100%;
  padding: 8px 0 0 0;
  overflow-y: auto;
`;

const User = styled.li`
  display: flex;
  height: 80px;
  padding: 16px 18px;
  cursor: pointer;

  .Who {
    margin-left: 12px;
  }
`;

export default UserList;
