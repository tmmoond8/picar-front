/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';
import Icon from '../Icon';
import { useEditorContext, observer } from './context';
import { CAROUSEL } from '../../types/constants';

const Selector: React.FC = () => {
  const { step, setStep, selected } = useEditorContext();
  const handleNext = React.useCallback(() => {
    setStep(step + 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <StyledSelector onClick={handleNext}>
      {selected}
      <Icon icon="selectorDown" size="16px" />
    </StyledSelector>
  );
};

export default observer(Selector);

const StyledSelector = styled.button`
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: auto;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  color: ${colors.black77};
  background-color: ${colors.blackF5F6F7};
  border-radius: 8px;
  cursor: pointer;

  .Icon.selectorDown {
    margin: 0 0 0 6px;
    cursor: pointer;
  }
`;
