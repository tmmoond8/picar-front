/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { colors } from '../../styles';
import Icon from '../Icon';

const BackHeader: React.FC<{
  options?: {
    title?: string;
    right?: React.ReactNode;
    noBottomLine?: boolean;
  }
}> = ({ options = {} }) => {
  const history = useHistory();

  return (
    <StyledBack noBottomLine={options.noBottomLine ?? false}>
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

export default BackHeader;

const HEIGHT = 56;

const StyledBack = styled.nav<{noBottomLine: boolean}>`
  position: relative;
  height: ${HEIGHT}px;
  min-height: ${HEIGHT}px;
  width: 100%;
  padding: 0 18px;
  background: ${colors.white};
  color: ${colors.black100};
  
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
    display: flex;
    position: absolute;
    right: 18px;
    top: 18px;

    svg + svg {
      margin-left: 12px;
    }
  }
  
  ${p => !p.noBottomLine && css`
    box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.6);
  `}
`;
