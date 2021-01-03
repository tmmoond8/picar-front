/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';

interface ArticleCardHeadProps {
  thumbnail: string;
  name: string;
  group: string;
  createAt: string;
}

const ArticleCardHead: React.FC<ArticleCardHeadProps> = ({
  thumbnail,
  name,
  group,
  createAt,
}) => {
  return (
    <Head>
      <ProfilePhoto src={thumbnail} size={24} />
      <Profile.WhoDot name={name} group={group} />
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
    color: ${colors.black99};
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 8px;
`;

const Body = styled.div`
  display: flex;
  padding: 16px 0;
  cursor: pointer;

  .article-content-wrapper {
    flex: 1;
  }

  .article-title {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article-content {
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.black99};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
