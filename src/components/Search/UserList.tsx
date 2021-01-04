/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { Profile as ProfileType } from '../../types/User';
import { colors } from '../../styles';
import Profile from '../Profile';

const UserList: React.FC<{ users: ProfileType[]}> = ({ users }) => {
  return (
    <List className="UserList">
      {users.map(({ code, thumbnail, name, group }) => (
        <User key={code}>
          <Profile.Photo src={thumbnail} size={48}/>
          <Profile.Who name={name} group={group}/>
        </User>
      ))}
    </List>
  )
}

const List = styled.ol`
  width: 100%;
  padding: 8px 0 0 0;
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

export default  UserList;

var test: ProfileType[] = [
  {
    code: "phupdv3yb",
    description: '',
    email: "ttl7917516@naver.com",
    group: "주점",
    name: "실버",
    profileImage: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg",
    thumbnail: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg",
  },
  {
    code: "phupdv3yb",
    description: '',
    email: "ttl7917516@naver.com",
    group: "주점",
    name: "실버",
    profileImage: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg",
    thumbnail: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg",
  },
  {
    code: "phupdv3yb",
    description: '',
    email: "ttl7917516@naver.com",
    group: "주점",
    name: "실버",
    profileImage: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg",
    thumbnail: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg",
  },
  {
    code: "phupdv3yb",
    description: '',
    email: "ttl7917516@naver.com",
    group: "주점",
    name: "실버",
    profileImage: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg",
    thumbnail: "http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg",
  },
]
