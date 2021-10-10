/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import FullButton from './FullButton';
import { useStore, observer } from '../../stores';

interface BottomCTAProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}
const BottomCTA: React.FC<BottomCTAProps> = (props) => {
  const { onClick, disabled, children } = props;
  const { ui } = useStore();
  return (
    <StyledBottomCTA
      onClick={onClick}
      disabled={disabled}
      keyboardMargin={ui.keyboardMargin}
    >
      {children}
    </StyledBottomCTA>
  );
};

export default observer(BottomCTA);

const StyledBottomCTA = styled(FullButton)<{ keyboardMargin: number }>`
  position: fixed;
  bottom: calc(${(p) => p.keyboardMargin}%);
  width: calc(100% - 32px);
  margin: 0 16px 12px 16px;
  transition: bottom 0.3s ease-out;
  z-index: 2500;
`;
