/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Button from '../Button';

const BottomCTA = styled(Button.Full)`
  position: fixed;
  bottom: 0;
  width: calc(100% - 32px);
  margin: 0 16px 12px 16px;
  z-index: 2500;
`;

interface Props {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export default function (props: Props): JSX.Element {
  const { onClick, disabled, children } = props;
  return (
    <BottomCTA onClick={onClick} disabled={disabled}>
      {children}
    </BottomCTA>
  );
}
