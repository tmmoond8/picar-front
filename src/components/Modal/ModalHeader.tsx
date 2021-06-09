/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import { colors } from '../../styles';


const ModalHeader: React.FC<{
  className?: string;
  title: string;
  handleClose: () => void;
  noRadius?: boolean;
  hasTitleLine?: boolean;
}> = ({
  className, title, handleClose, noRadius = false, hasTitleLine = true
}) => {
    return (
      <Head className={cx('ModalHeader', className)} noRadius={noRadius} hasTitleLine={hasTitleLine}>
        <Title>{title}</Title>
        <CloseButton onClick={handleClose}>
          <Icon icon="close" size="24px" color={colors.black33} />
        </CloseButton>
      </Head>
    );
  }

export default React.memo(ModalHeader);

const HEIGHT = 60;

const Head = styled.div<{ noRadius: boolean; hasTitleLine: boolean }>`
  display: flex;
  position: relative;
  height: ${HEIGHT}px;
  padding: 18px 16px;
  align-items: center;
  border-radius: ${(p) => (p.noRadius ? 'none' : '12px 12px 0 0')};
  background-color: ${colors.white};
  /* box-shadow: inset 0 -0.5px 0 0 ${p => p.hasTitleLine ? colors.blackBF : colors.transparent}; */
`;

const Title = styled.h2`
  flex: 1;
  font-size: 17px;
  font-weight: 500;
  color: ${colors.black22};
  text-align: center;
`;

const CloseButton = styled(Button)`
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;

  .Icon.close {
    cursor: pointer;
  }
`;
