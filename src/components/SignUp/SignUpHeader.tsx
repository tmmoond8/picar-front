/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useSignUpContext, observer } from './context';
import Icon from '../Icon';
import { colors } from '../../styles';

const HEIGHT = 60;

const Header = styled.nav`
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

export default observer(function SignUpHeader(): JSX.Element {
  const { step, setStep, onClose } = useSignUpContext();
  const handleClick = React.useCallback(() => {
    if (step === 0) {
      onClose();
    } else {
      setStep(step - 1);
    }
  }, [onClose, setStep, step]);
  const icon = React.useMemo(() => (step === 0 ? 'close' : 'back'), [step]);

  return (
    <Header>
      <Icon
        icon={icon}
        size="24px"
        color={colors.black100}
        onClick={handleClick}
      />
      <h2 className="title">회원가입</h2>
      <div className="right"></div>
    </Header>
  );
});
