/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

const Logo: React.FC<{
  className?: string;
  color?: string;
  size?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className, onClick }) => {


  return (
    <LogoSVG
      className={className} width="83" height="28" viewBox="0 0 83 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={(e) => {
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M53.0021 24.909H49.5552V3.09082H53.0021V24.909ZM78.1349 11.4452H82.0492V14.2203H78.1349V24.909H74.6879V3.09082H78.1349V11.4452ZM47.9134 4.07342H31V6.81972H34.0075V18.9935H31V21.7398H47.9134V18.9935H45.4349V6.81972H47.9134V4.07342ZM42.0365 6.81972H37.406V18.9935H42.0365V6.81972ZM71.0913 22.4568V3.93892L57.4826 3.93881V6.68511H67.6472V11.8542H57.4826V14.6447H67.6472V22.4568H71.0913Z" fill="#332E1F"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.096 0.459443L0.969166 13.9905C0.81352 14.2213 0.978855 14.5322 1.25719 14.5322H9.99332L1.27456 27.4583C1.11892 27.6891 1.28425 28 1.56259 28H13.597C13.9435 28 14.2673 27.8278 14.4611 27.5406L23.5879 14.0095C23.7436 13.7787 23.5782 13.4678 23.2999 13.4678H14.5637L23.2825 0.541704C23.4382 0.31095 23.2728 0 22.9945 0H10.9601C10.6136 0 10.2897 0.172188 10.096 0.459443Z" fill="#FFC800"/>
    </LogoSVG >
  )

}

export default Logo;

const LogoSVG = styled.svg`
  cursor: pointer;;
  width: auto;
  height: 28px;
  object-fit: contain;
`;