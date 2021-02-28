/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

const Squircle: React.FC<{
  className?: string;
  src: string;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className, src, size = 32, onClick}) => {
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  }, [onClick]);
  const { shapeSquircle, clipSquircle } = useUUID();
  return (
    <Wrapper width={size} className={cx('UserProfilePhoto', className)} onClick={handleClick}>
      <svg viewBox="0 0 88 88">
        <defs>
          <path id={shapeSquircle} d="M44,0 C76.0948147,0 88,11.9051853 88,44 C88,76.0948147 76.0948147,88 44,88 C11.9051853,88 0,76.0948147 0,44 C0,11.9051853 11.9051853,0 44,0 Z"></path>
          <clipPath id={clipSquircle}>
            <use xlinkHref={`#${shapeSquircle}`}/>
          </clipPath>
        </defs>

        <image width="100%" 
          height="100%"  
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipSquircle})`} 
          xlinkHref={src}
        />
      </svg>
    </Wrapper>
  )
}

export default Squircle;

const Wrapper = styled.div<{ width: number}>`
  height: ${p => p.width}px;
  svg {
    width: ${p => p.width}px;
    height: auto;
  }
`;

function useUUID() {
  const uuid = React.useMemo(() => Math.random().toString(32).substr(4), []);
  return {
    shapeSquircle: `shapeSquircle_${uuid}`,
    clipSquircle: `clipSquircle_${uuid}` 
  }
}