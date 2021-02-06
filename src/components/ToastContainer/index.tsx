import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, Slide } from 'react-toastify';
import { useStore, observer } from '../../stores';

const Container = () => {
  const { ui } = useStore();

  return (
    <StyledToastContainer
      position={ui.queryMatch.Mobile ? "bottom-center" : "top-right"}
      autoClose={3000}
      hideProgressBar
      closeOnClick={false}
      transition={Slide}
    />
  );
};

export default observer(Container);

const StyledToastContainer = styled(ToastContainer)`
  & {
    width: 100%;
    max-width: 375px;
    padding: 0 8px;
  }
  .Toastify__toast {
    min-height: auto;
    margin: 16px 0 0 0;
    padding: 12px 18px;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: rgba(16, 16, 16, 0.8);
  }
  .Toastify__toast-body {
    font-size: 14px;
    line-height: 1.43;
    opacity: 0.8;
    text-align: center;
  }
  .Toastify__close-button {
    display: none;
  }
`;
