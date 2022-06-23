/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

export interface AlertData {
  title: string;
  id: string;
  subtitle?: string;
  handleConfirm: () => void;
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
        <Content>
          <h3 className="Title">{title}</h3>
          {subtitle && <p className="Subtitle">{subtitle}</p>}
        </Content>
        <ActionButton
          className="Confrim"
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          확인
        </ActionButton>
        <ActionButton className="Cancel" onClick={handleClose}>
          취소
        </ActionButton>
      </Box>
    </AlertContainer>
  );
};

export default React.memo(AlertViewer);

const AlertContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 10040;
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
  transform: translate3d(0, -50%, 0);
`;

const Content = styled.div`
  padding: 32px 32px 24px 32px;
  .Title {
    padding: 0 0 8px 0;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.41;
    letter-spacing: -0.25px;
    white-space: pre;
    text-align: center;
  }
  .Subtitle {
    padding: 8px 0 0 0;
    font-size: 14px;
    line-height: 1.43;
    color: ${colors.black99};
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
  cursor: pointer;

  &.Confrim {
    font-weight: bold;
  }
`;
