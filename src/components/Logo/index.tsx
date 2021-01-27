/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import { ReactComponent as LogoSVG } from './logo.svg';

const Logo: React.FC<{
  className?: string;
  color?: string;
  size?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className, onClick }) => {
  return <StyledLogo className={cx('Logo', className)} onClick={(e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  }}/>
}

export default Logo;

const StyledLogo = styled(LogoSVG)`
  cursor: pointer;;
`;