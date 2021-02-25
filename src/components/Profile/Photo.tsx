/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

interface ProfilePhotoProps {
  className?: string;
  src?: string;
  onClick?: (e: React.MouseEvent) => void;
  size?: number;
}

const defaultImage =
'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735392/noticon/ggaqjh4wfjf0miavt4dc.png';

export default function ProfilePhoto(props: ProfilePhotoProps): JSX.Element {
  const { src, onClick, size = 32, className } = props;
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    if (typeof onClick === 'function') {
      onClick(e);
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
  clip-path: url(#squircle);
  cursor: ${p => p.clickable ? 'pointer' : 'auto'};
`;
