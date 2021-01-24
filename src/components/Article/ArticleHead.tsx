/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Profile from '../Profile';
import { useModal } from '../Modal';

import { getDateGoodLook } from '../../modules/string';
import { useArticleContext, observer } from './context';
import ProfileContainer from '../Profile/ProfileContainer';

const ArticleHead = () => {
  const { article } = useArticleContext();
  const { thumbnail, id, name, group, code } = article!.author;
  const modal = useModal();

  const handleOpenProfile = React.useCallback(() => {
    modal.open({
      title: '',
      isFull: true,
      contents: (
        <ProfileContainer userCode={code}/>
      ),
    });
  }, [modal])

  return (
    <Self>
      <Profile.Photo src={thumbnail} onClick={handleOpenProfile} />
      <Content>
        <Profile.WhoDot name={name} group={group} />
        <p className="date">{getDateGoodLook(article!.createAt)}</p>
      </Content>
    </Self>
  );
};
export default observer(ArticleHead);

const Self = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0 16px;
`;

const Content = styled.div`
  margin: 0 0 0 13px;

  .date {
    margin: 1px 0 0 0;
    font-size: 13px;
    color: ${colors.black99};
  }
`;
