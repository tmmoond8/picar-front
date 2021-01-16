/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cx from 'classnames';
import { ReactComponent as LogoSVG } from './logo.svg';

const Logo: React.FC<{
  className?: string;
  color?: string;
  size?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className }) => {
  return <LogoSVG className={cx('Logo', className)}/>
}

export default Logo;