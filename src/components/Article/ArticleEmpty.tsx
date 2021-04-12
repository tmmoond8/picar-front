/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';
import Icon from '../Icon';

const ArticleEmpy: React.FC<{}> = () => {
  return (
    <StyledArticleEmpy>
      <Box />
      <StitchecRectagle
        icon="stitchedRectangle"
        size="55px"
        color={colors.blackD9}
      />
      <NotificationText>앗! 삭제된 게시물입니다.</NotificationText>
    </StyledArticleEmpy>
  );
};

export default ArticleEmpy;

const StyledArticleEmpy = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-self: center;
  height: calc(100% - 56px);
  padding: 18px;
`;

const Box = styled.div`
  height: 100px;
  width: 100%;
  background-color: rgba(255, 37, 83, 0.1);
`;

const StitchecRectagle = styled(Icon)`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50px);
`;

const NotificationText = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 17px;
  line-height: 1.18;
  color: ${colors.black99};
  transform: translate(-50%, 30px);
  z-index: 10;
`;
