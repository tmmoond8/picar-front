/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';
import Icon from '../Icon';

const ArticleErrorMessage: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <StyledArticleErrorMessage>
      <StitchecRectagle
        icon="stitchedRectangle"
        size="55px"
        color={colors.blackD9}
      />
      <NotificationText>{message}</NotificationText>
    </StyledArticleErrorMessage>
  );
};

export default ArticleErrorMessage;

const StyledArticleErrorMessage = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-self: center;
  height: calc(100% - 56px);
  padding: 18px;
`;

const StitchecRectagle = styled(Icon)`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50px, 0);
`;

const NotificationText = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 17px;
  line-height: 1.18;
  color: ${colors.black99};
  transform: translate3d(-50%, 30px, 0);
  z-index: 10;
`;
