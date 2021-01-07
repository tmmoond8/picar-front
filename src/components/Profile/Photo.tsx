/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

interface ProfilePhotoProps {
  className?: string;
  src?: string;
  onClick?: () => void;
  size?: number;
}

const defaultImage =
  'https://res.cloudinary.com/dgggcrkxq/image/upload/v1600597433/noticon/ayvhqsqwqbfr0dauelcv.png';

export default function ProfilePhoto(props: ProfilePhotoProps): JSX.Element {
  const { src, onClick, size = 32, className } = props;
  const handleClick = React.useCallback(() => {
    if (typeof onClick === 'function') {
      onClick();
    }
  }, [onClick]);
  return (
    <Photo
      className={cx('UserProfilePhoto', className)}
      src={src || defaultImage}
      size={size}
      onClick={handleClick}
      clickable={typeof onClick === 'function'}
    />
  );
}

const Photo = styled.img<{ src: string; size: number; clickable: boolean}>`
  width: ${(p) => p.size}px;
  min-width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  min-height: ${(p) => p.size}px;
  object-fit: cover;
  border-radius: ${(p) => p.size / 3}px;
  cursor: ${p => p.clickable ? 'pointer' : 'auto'};
`;
