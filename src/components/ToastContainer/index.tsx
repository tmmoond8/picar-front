import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import { colors } from '../../styles';

const Container = () => {
  return (
    <StyledToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick={false}
    />
  );
};

export default Container;

const StyledToastContainer = styled(ToastContainer)`
  & {
    width: 100%;
    max-width: 375px;
    padding: 0 8px;
  }
  .Toastify__toast {
    margin: 16px 0 0 0;
    padding: 14px 18px;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: ${colors.black22};
  }
  .Toastify__toast-body {
    font-size: 14px;
    line-height: 1.43;
    text-align: center;
  }
  .Toastify__close-button {
    display: none;
  }
`;
