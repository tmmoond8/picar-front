/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStore } from '../../stores';
import { colors } from '../../styles';
import Icon from '../Icon';

export default function Back(): JSX.Element {
  const { article, ui } = useStore();
  const headerOptions = ui.header.options;
  const history = useHistory();

  return (
    <StyledBack headerHeight={ui.header?.height || 0}>
      <h2 className="title">{headerOptions?.title || ''}</h2>
      <Icon
        icon="back"
        size="24px"
        color={colors.black100}
        onClick={() => history.goBack()}
      />
      <div className="right">{headerOptions?.right}</div>
    </StyledBack>
  );
}

const StyledBack = styled.nav<{ headerHeight: number }>`
  position: relative;
  height: ${(p) => p.headerHeight}px;
  width: 100%;
  padding: 0 18px;
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
