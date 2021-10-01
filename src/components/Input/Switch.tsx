/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';

interface SwitchProps {
  className?: string;
  label?: string;
  values: { value: string; displayName: string }[];
  currentValue: string;
  setCurrentValue: (value: string) => void;
}

const Wrapper = styled.div`
  padding: 12px 0;
  color: ${colors.black77};
  label {
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    opacity: 0.99;
  }
  ul {
    position: relative;
    display: flex;
    height: 54px;
    margin-top: 10px;
    background-color: ${colors.blackF5F6F7};
    border-radius: 4px;
  }
`;
const Button = styled.li<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    position: absolute;
    color: ${colors.black99};
    z-index: 2;
    ${(p) =>
      p.selected &&
      css`
        color: ${colors.black22};
      `}
  }
`;

const Indicator = styled.div<{ isRight: boolean }>`
  position: absolute;
  top: 6px;
  left: 6px;
  height: 42px;
  width: calc(50% - 10px);
  background-color: ${colors.white};
  border-radius: 3px;
  transform: translateX(0);
  ${(p) =>
    p.isRight &&
    css`
      transform: translateX(calc(100% + 6px));
    `}
  transition: transform 0.2s ease-out;
`;

export default function Switch(props: SwitchProps): JSX.Element {
  const { className, label, values, currentValue, setCurrentValue } = props;
  const [
    { value: left, displayName: leftDisplay },
    { value: right, displayName: rightDisplay },
  ] = values;
  const isRight = React.useMemo(
    () => currentValue === right,
    [currentValue, right],
  );
  return (
    <Wrapper className={cx('Switch', className)}>
      {label && <span role="label">{label}</span>}
      <ul>
        <Button
          selected={left === currentValue}
          key={left}
          onClick={() => setCurrentValue(left)}
        >
          <span>{leftDisplay}</span>
        </Button>
        <Button
          selected={right === currentValue}
          key={right}
          onClick={() => setCurrentValue(right)}
        >
          <span>{rightDisplay}</span>
        </Button>
        <Indicator isRight={isRight} />
      </ul>
    </Wrapper>
  );
}
