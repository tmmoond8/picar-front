/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import logo from './logo.png';

const Logo: React.FC<{
  className?: string;
  color?: string;
  size?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className, onClick }) => {
  return <StyledLogo className={cx('Logo', className)} src={logo} alt="picar, icon" onClick={(e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  }} />
}

export default Logo;

const StyledLogo = styled.img`
  cursor: pointer;;
  width: 154px;
  height: 48px;
`;