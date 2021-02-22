/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Carousel from '../Carousel';
import { useEditorContext, observer } from './context';
import { CAROUSEL } from '../../types/constants';

const Header: React.FC = () => {
  const { article, step, onClose, HeaderRight, setStep }  = useEditorContext();

  const handleGoBack = React.useCallback(() => {
    setStep(step - 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step - 1);
  }, [step])

  return (
    <StyledHeader 
      title={article ? '글 수정' : '글 작성'}
      onBack={handleGoBack}
      onClose={onClose}
      step={step}
      right={HeaderRight}
      hideRight={step !== 0}
    />
  )
}

export default observer(Header);

const StyledHeader = styled(Carousel.Header)<{ hideRight: boolean}>`
  ${p => p.hideRight && css`
    .right {
      display: none;
    }
  `}
`;

