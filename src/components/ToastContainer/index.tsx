/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ToastContainer, Slide } from 'react-toastify';
import { useStore, observer } from '../../stores';
import { colors } from '../../styles';

const Container = () => {
  const { ui } = useStore();

  return (
    <StyledToastContainer
      position={ui.queryMatch.Mobile ? "bottom-center" : "top-center"}
      autoClose={3000}
      hideProgressBar
      closeOnClick={false}
      transition={Slide}
      desktop={!ui.queryMatch.Mobile}
    />
  );
};
export default observer(Container);

const StyledToastContainer = styled(ToastContainer)<{ desktop: boolean }>`
  & {
    width: 100%;
    bottom: 66px;
    padding: 0 8px;
  }
  .Toastify__toast {
    min-height: auto;
    margin: 0;
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
  & {
    ${p => p.desktop && css`
    top: 64px;
    bottom: auto;
    padding: 0;
    .Toastify__toast {
      color: ${colors.primary};
      font-weight: bold;
      font-size: 15px;
      border-radius: 0;
      background-color: ${colors.primaryE};
      box-shadow: 0 1px rgba(8, 48, 98, 0.2);
    }
  `}
  }
`;
