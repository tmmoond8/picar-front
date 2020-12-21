/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core';
import emotionReset from 'emotion-reset';

const customReset = css`
  html,
  body,
  body > div,
  #root {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
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
  }

  .OwnerBottomSheetWrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    overflow: scroll;
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
    font-size: 16px;
  }
`;

export default function GlobalStyles(): JSX.Element {
  return <Global styles={[emotionReset, customReset]} />;
}
