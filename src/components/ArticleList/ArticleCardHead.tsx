/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';

interface ArticleCardHeadProps {
  profileImage: string;
  name: string;
  group: string;
  createAt: string;
  userCode: string;
}

const ArticleCardHead: React.FC<ArticleCardHeadProps> = ({
  profileImage,
  name,
  group,
  createAt,
  userCode,
}) => {
  const handleOpenProfile = Profile.useOpenProfile();

  return (
    <Head>
      <ProfilePhoto
        src={profileImage}
        size={24}
        onClick={() => handleOpenProfile(userCode)}
      />
      <Profile.WhoDot
        name={name}
        group={group}
        onClick={() => handleOpenProfile(userCode)}
      />
      <p className="article-time">{getDateGoodLook(createAt)}</p>
    </Head>
  );
};

export default ArticleCardHead;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  .article-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    font-weight: 400;
    color: ${colors.blackAA};
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 8px;
`;
