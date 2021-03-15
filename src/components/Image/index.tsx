/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import emptyImage from './empty-image.svg';


const Image: React.FC<{ src: string; className?: string;  }> = ({
  src, className
}) => {
  const ref = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.src = src;
    }
  }, [ref])
  
  return (
    <StyledImage ref={ref} src={emptyImage} className={cx('Image', className)}/>
  );
};

export default Image;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;