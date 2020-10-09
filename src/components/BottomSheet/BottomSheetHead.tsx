/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import { colors } from '../../styles';

interface HeadProps {
  className?: string;
  title: string;
  handleClose: () => void;
  noRadius?: boolean;
}

export default function ModalHead(props: HeadProps) {
  const { className, title, handleClose, noRadius = false } = props;
  return (
    <Head className={cx('ModalHead', className)} noRadius={noRadius}>
      <Title>{title}</Title>
      <CloseButton onClick={handleClose}>
        <Icon icon="close" size="20px" color={colors.black} />
      </CloseButton>
    </Head>
  );
}

const Head = styled.div<{ noRadius: boolean }>`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 18px 20px;
  border-radius: ${(p) => (p.noRadius ? 'none' : '12px 12px 0 0')};
  background-color: ${colors.white};
  box-shadow: inset 0 -0.5px 0 0 ${colors.blackBF};
`;

const Title = styled.h2`
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.black22};
`;

const CloseButton = styled(Button)`
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
`;
