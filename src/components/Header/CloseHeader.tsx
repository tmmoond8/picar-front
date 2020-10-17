/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Icon from '../Icon';

interface CloseHeaderProps {
  options?: Record<string, any>
  onClose?: () => void;
}

export default function CloseHeader(props: CloseHeaderProps): JSX.Element {
  const { options = {}, onClose } = props;
  const handleClose = React.useCallback(() => {
    if (typeof onClose === 'function') onClose();
  }, [onClose])

  return (
    <StyledClose>
      <Icon
        icon="close"
        size="24px"
        color={colors.black100}
        onClick={handleClose}
      />
      <h2 className="title">{options.title ?? ''}</h2>
      <div className="right">{options?.right}</div>
    </StyledClose>
  );
}

const HEIGHT = 56;

const StyledClose = styled.nav`
  position: relative;
  height: ${HEIGHT}px;
  width: 100%;
  padding: 0 18px;
  background: ${colors.white};
  color: ${colors.black100};
  box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.6);
  & > svg {
    position: absolute;
    left: 18px;
    top: 18px;
  }

  .title {
    line-height: ${HEIGHT}px;
    text-align: center;
  }

  .right {
    position: absolute;
    right: 18px;
    top: 18px;
  }
`;
