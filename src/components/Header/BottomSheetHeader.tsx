/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import { colors } from '../../styles';

interface BottomSheetHeaderProps {
  className?: string;
  title: string;
  handleClose: () => void;
  noRadius?: boolean;
}

export default function BottomSheetHeader(props: BottomSheetHeaderProps) {
  const { className, title, handleClose, noRadius = false } = props;
  return (
    <Head className={cx('BottomSheetHeader', className)} noRadius={noRadius}>
      <Title>{title}</Title>
      <CloseButton onClick={handleClose}>
        <Icon icon="close" size="20px" color={colors.black33} />
      </CloseButton>
    </Head>
  );
}

const HEIGHT = 60;

const Head = styled.div<{ noRadius: boolean }>`
  display: flex;
  position: relative;
  height: ${HEIGHT}px;
  padding: 18px 16px;
  align-items: center;
  border-radius: ${(p) => (p.noRadius ? 'none' : '12px 12px 0 0')};
  background-color: ${colors.white};
  box-shadow: inset 0 -0.5px 0 0 ${colors.blackBF};
`;

const Title = styled.h2`
  flex: 1;
  font-size: 17px;
  font-weight: 700;
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
`;
