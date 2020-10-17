/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { colors } from '../../styles';
import Icon from '../Icon';

interface BackHeaderProps {
  options?: Record<string, any>
}

export default function BackHeader(props: BackHeaderProps): JSX.Element {
  const { options = {} } = props;
  const history = useHistory();

  return (
    <StyledBack >
      <h2 className="title">{options?.title || ''}</h2>
      <Icon
        icon="back"
        size="24px"
        color={colors.black100}
        onClick={() => history.goBack()}
      />
      <div className="right">{options?.right}</div>
    </StyledBack>
  );
}

const HEIGHT = 56;

const StyledBack = styled.nav`
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
