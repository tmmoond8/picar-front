/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

const emptyImageBase64 =
  '"data:image/png;base64,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"';

const Image: React.FC<{
  src: string;
  placeholder?: string;
  className?: string;
}> = ({ src, placeholder = emptyImageBase64, className }) => {
  const ref = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.src = src;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <StyledImage
      ref={ref}
      src={placeholder}
      className={cx('Image', className)}
    />
  );
};

export default Image;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
