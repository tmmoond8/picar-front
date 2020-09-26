/** @jsx jsx */
import { jsx } from '@emotion/core';
import cx from 'classnames';
import { colors } from '../../styles';
import * as icons from './icons';
import * as styles from './styles';

type IconType = keyof typeof icons;

export const iconTypes: IconType[] = Object.keys(icons) as any[]; // for storybook

export type IconProps = {
  /** icon name (ex: hambug) */
  icon: IconType;
  /** icon color */
  color?: string;
  size?: string;
  className?: string;
};

/**
 *
 * this component show as a svg format, you can styling by color and size.
 *
 */
export default function Icon(props: IconProps): JSX.Element {
  const { icon, color = colors.blackD9, className, size = '1em' } = props;
  const customStyle = styles.customStyle({
    color,
  });
  const SVGIcon = icons[icon];
  return (
    <SVGIcon
      css={[styles.base, customStyle, styles.size(size)]}
      className={cx('icon', className)}
    />
  );
}
