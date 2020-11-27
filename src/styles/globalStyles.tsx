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
`;

export default function GlobalStyles(): JSX.Element {
  return <Global styles={[emotionReset, customReset]} />;
}
