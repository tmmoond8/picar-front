/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import cx from 'classnames';
import { colors } from '../../styles';

interface WhoProps {
  className?: string;
  name: string;
  group?: string;
  nameColor?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}

export const WhoDot: React.FC<WhoProps> = (props) => {
  const {
    name,
    group,
    className,
    nameColor,
    right,
    onClick = () => {},
  } = props;
  return (
    <StyledWhotDot className={cx(className, 'Who')} nameColor={nameColor}>
      <p className="user-name" onClick={onClick}>
        {name}
      </p>
      {group && <p className="user-group">{group}</p>}
      {right && right}
    </StyledWhotDot>
  );
};

export const Who: React.FC<WhoProps> = (props) => {
  const { name, group, className, onClick } = props;
  return (
    <StyledWho className={cx(className, 'Who')}>
      <p className="user-name" onClick={onClick}>
        {name}
      </p>
      <p className="user-group">{group}</p>
    </StyledWho>
  );
};

const StyledWhotDot = styled.div<{ nameColor?: string }>`
  display: flex;
  font-weight: 500;

  .user-name {
    font-size: 14px;
    color: ${colors.black50};
    cursor: pointer;
    ${(p) =>
      p.nameColor &&
      css`
        color: ${colors.primary2};
      `}
  }
  .user-group {
    position: relative;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.black99};
    &::before {
      content: '·';
      position: absolute;
      width: 10px;
      height: 10px;
      left: -8px;
      top: 0px;
    }
  }
`;

const StyledWho = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .user-name {
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: ${colors.black22};
  }

  .user-group {
    position: relative;
    font-size: 14px;
    line-height: 14px;
    color: ${colors.black77};
  }
`;
