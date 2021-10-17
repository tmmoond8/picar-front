/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core';
import emotionReset from 'emotion-reset';
import colors from './colors';
import * as constants from './constants';

const customReset = css`
  html {
    font-family: 'Noto Sans KR', sans-serif;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  body {
    background-color: ${colors.blackF5F6F7};
  }

  html,
  body,
  body > div,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  a {
    text-decoration: none;
    color: unset;
  }
  button {
    background: none;
    border: none;
    outline: none;
  }

  .owner * {
    line-height: normal;
  }
  * {
    font-weight: 500;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  .OwnerBottomSheetWrapper {
    position: fixed;
    top: 0;
    bottom: ${constants.safeBottom};
    right: 0;
    left: 0;
    margin: auto;
    overflow: auto;
  }

  input[type='color'],
  input[type='date'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='email'],
  input[type='month'],
  input[type='number'],
  input[type='password'],
  input[type='search'],
  input[type='tel'],
  input[type='text'],
  input[type='time'],
  input[type='url'],
  input[type='week'],
  select:focus,
  textarea {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    -webkit-appearance: none;
  }
`;

export default function GlobalStyles(): JSX.Element {
  return <Global styles={[emotionReset, customReset]} />;
}
