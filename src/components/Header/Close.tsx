/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStore } from '../../stores';
import { colors } from '../../styles';
import Icon from '../Icon';

export default function Close(): JSX.Element {
  const { article, ui } = useStore();
  const headerOptions = ui.header.options;
  const history = useHistory();

  return (
    <StyledClose headerHeight={ui.header?.height || 0}>
      <h2 className="title">글 쓰기</h2>
      <Icon
        icon="close"
        size="24px"
        color={colors.black100}
        onClick={() => history.goBack()}
      />
      <div className="right">{headerOptions?.right}</div>
    </StyledClose>
  );
}

const StyledClose = styled.nav<{ headerHeight: number }>`
  position: relative;
  height: ${(p) => p.headerHeight}px;
  width: 100%;
  padding: 0 18px;
  color: ${colors.black100};
  box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.6);
  & > svg {
    position: absolute;
    left: 18px;
    top: 18px;
  }

  .title {
    line-height: ${(p) => p.headerHeight}px;
    text-align: center;
  }

  .right {
    position: absolute;
    right: 18px;
    top: 18px;
  }
`;
