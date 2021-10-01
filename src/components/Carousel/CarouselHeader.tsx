/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import { colors } from '../../styles';

export interface CarouselHeaderProps {
  step: number;
  title: string;
  right?: React.ReactNode;
  className?: string;
  onBack: () => void;
  onClose: () => void;
}

const CarouselHeader: React.FC<CarouselHeaderProps> = ({
  step,
  onBack,
  onClose,
  title,
  right,
  className,
}) => {
  const handleClick = React.useCallback(() => {
    if (step === 0) {
      onClose();
    } else {
      onBack();
    }
  }, [onClose, onBack, step]);
  const icon = React.useMemo(() => (step === 0 ? 'close' : 'back'), [step]);

  return (
    <Header className={cx('CarouselHeader', className)}>
      <Icon
        icon={icon}
        size="24px"
        color={colors.black100}
        onClick={handleClick}
      />
      <h2 className="title">{title}</h2>
      <div className="right">{right}</div>
    </Header>
  );
};

export default CarouselHeader;

const HEIGHT = 60;

const Header = styled.nav`
  position: relative;
  height: ${HEIGHT}px;
  width: 100%;
  padding: 0 18px;
  background: ${colors.white};
  color: ${colors.black100};
  /* box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.6); */
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
