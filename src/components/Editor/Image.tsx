/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Icon from '../Icon';

const Image: React.FC<{
  photoUrl?: string;
  thumbnailUrl?: string;
  preUploadUrl?: string;
  isOnThumnbailUpload?: boolean;
  clear: () => void;
}> = ({ preUploadUrl, photoUrl, isOnThumnbailUpload = false, clear }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(!photoUrl);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [photoUrl]);

  return (
    <Wrapper isLoading={isLoading || isOnThumnbailUpload}>
      <img src={preUploadUrl} alt="image for article" />
      {(isLoading || isOnThumnbailUpload) && (
        <Loader icon="loading" size="24px" />
      )}
      <ClearButton onClick={clear}>
        <Icon icon="close" size="16px" />
      </ClearButton>
    </Wrapper>
  );
};

export default Image;

const Wrapper = styled.figure<{ isLoading: boolean }>`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    object-position: top;
  }

  ${(p) =>
    p.isLoading &&
    css`
      img {
        filter: brightness(0.5);
      }
    `}
`;

const Loader = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  color: white;

  @keyframes rotate {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
  animation: rotate 1.5s linear infinite;
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -6px;
  top: -6px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(51, 51, 51, 0.8);
`;
