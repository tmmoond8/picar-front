/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

export interface AlertData {
  title: string;
  id: string;
  subtitle?: string;
  handleConfirm: () =>void;
  handleClose: () => void;
}

const AlertViewer: React.FC<AlertData> = ({
  title,
  subtitle,
  handleConfirm,
  handleClose,
}) => {

  return (
    <AlertContainer className="AlertContainer">
      <Box>
        <h3 className="Title">{title}</h3>
        {subtitle && <p className="Subtitle">{subtitle}</p>}
        <ActionButton className="Confrim" onClick={handleConfirm}>확인</ActionButton>
        <ActionButton className="Cancel" onClick={handleClose}>취소</ActionButton>
      </Box>
    </AlertContainer>
  );
};

export default React.memo(AlertViewer);

const popup = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0.2;
  } 
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 4000;
`;

const Box = styled.section`
  position: relative;
  top: 50%;
  width: calc(100% - 24px);
  max-width: 327px;
  height: auto;
  margin: auto;
  border-radius: 8px;
  background-color: ${colors.white};
  transform: translateY(-50%);

  .Title {
    padding: 32px 19px;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.41;
    letter-spacing: -0.25px;
    text-align: center;
  }
`;

const ActionButton = styled.button`
  display: block;
  height: 52px;
  width: calc(100% - 8px);
  margin: 0 auto;
  border-top: 1px solid ${colors.blackEB};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.22px;

  &.Confrim {
    font-weight: bold;
  }
`;
