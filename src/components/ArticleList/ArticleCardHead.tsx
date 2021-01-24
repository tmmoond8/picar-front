/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';
import { useModal } from '../Modal';
import ProfileContainer from '../Profile/ProfileContainer';

interface ArticleCardHeadProps {
  thumbnail: string;
  name: string;
  group: string;
  createAt: string;
  userCode: string;
}

const ArticleCardHead: React.FC<ArticleCardHeadProps> = ({
  thumbnail,
  name,
  group,
  createAt,
  userCode,
}) => {
  const modal = useModal();

  const handleOpenProfile = React.useCallback(() => {
    modal.open({
      title: '',
      isFull: true,
      contents: (
        <ProfileContainer userCode={userCode}/>
      ),
    });
  }, [modal])

  return (
    <Head>
      <ProfilePhoto src={thumbnail} size={24} onClick={handleOpenProfile}/>
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
