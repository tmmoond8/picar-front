/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Photo from './Photo';
import { colors } from '../../styles';

const Profile: React.FC<{
  name: string;
  group?: string;
  profileImage?: string;
  description: string | null;
}> = ({ name, group, description, profileImage }) => {
  return (
    <React.Fragment>
      <UserProfile>
        <Photo className="profilePhoto" src={profileImage} size={60} />
        <UserNameGroup>
          <h2 className="name">{name}</h2>
          <h4 className="group">{group}</h4>
        </UserNameGroup>
      </UserProfile>
      <Introduction>
        {description ??
          '삼산텍을 창업하고 소프트웨어 엔지니어로 일하고 있습니다. AI기술로 세상을 바꾸고 싶습니다.'}
      </Introduction>
    </React.Fragment>
  );
};

export default React.memo(Profile);

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  height: 88px;
  margin: 16px 0 0 0;
  text-align: center;
  .profilePhoto {
    display: inline-block;
  }
`;

const UserNameGroup = styled.div`
  margin: 0 0 0 16px;
  text-align: left;

  .name {
    font-size: 18px;
    font-weight: 500;
  }
  .group {
    margin: 5px 0 0 0;
    color: ${colors.black77};
    font-size: 14px;
  }
`;

const Introduction = styled.h3`
  padding: 8px 0;
  font-size: 15px;
  line-height: 25px;
  color: ${colors.black66};
`;
