/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cx from 'classnames';

import { colors } from '../../styles';
import * as icons from './icons';
import * as styles from './styles';

export type IconKey = keyof typeof icons;

export const iconTypes: IconKey[] = Object.keys(icons) as any[]; // for storybook

export type IconProps = {
  /** icon name (ex: hambug) */
  icon: IconKey;
  /** icon color */
  color?: string;
  size?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

/**
 *
 * this component show as a svg format, you can styling by color and size.
 *
 */
function Icon(props: IconProps): JSX.Element {
  const {
    icon,
    color = colors.blackD9,
    className,
    size = '1em',
    onClick,
  } = props;
  const customStyle = styles.customStyle({
    color,
    cursor: typeof onClick === 'function' ? 'pointer' : 'auto',
  });
  const handleClick = (e: React.MouseEvent) => {
    if (typeof onClick === 'function') onClick(e);
  };

  const SVGIcon = icons[icon];
  return (
    <SVGIcon
      css={[styles.base, customStyle, styles.size(size)]}
      className={cx('icon', className)}
      onClick={handleClick}
    />
  );
}

export default Icon;
