/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';
import API from '../../apis';

const Uploader: React.FC<{
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  setProfileUrl?: (url: string) => void;
  setThumbnailUrl?: (url: string) => void;
  setUploadedUrl?: (url: string) => void;
  setPreUploadUrl: (preUploadUrl: string) => void;
}> = ({
  className,
  children,
  isLoading = false,
  setUploadedUrl,
  setPreUploadUrl,
  setThumbnailUrl,
  setProfileUrl
}) => {
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = React.useCallback(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.click();
      }
    }, [])
    const handleChangeFile = async (event: React.ChangeEvent) => {
      event.preventDefault();
      const fileElement = event.target as HTMLInputElement;
      const files = fileElement.files;

      if (files && files.length > 0) {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = () => setPreUploadUrl(reader!.result!.toString());

          if (setProfileUrl) {
            API.imageUpload(files[0], 'picar_profile').then(profileUrl => setProfileUrl(profileUrl.imgUrl));
          }

          if (setThumbnailUrl) {
            API.imageUpload(files[0], 'picar_thumbnail').then(thumbnailUrl => setThumbnailUrl(thumbnailUrl.imgUrl));
          }
          if (setUploadedUrl) {
            API.imageUpload(files[0], 'picar_post').then(photoUrl => setUploadedUrl(photoUrl.imgUrl));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <StyledUploader className={className} onClick={handleClick} isLoading={isLoading}>
        {isLoading && <Loader icon="loading" size="24px" />}
        {children}
        <HiddenInput
          type="file"
          ref={hiddenInputRef}
          onChange={handleChangeFile}
          onError={(e) => {
            (e.target as HTMLInputElement).value = '';
            console.log('Error: ', e);
          }}
        />
      </StyledUploader>
    );
  };

export default Uploader;

const StyledUploader = styled.div<{ isLoading: boolean }>`
  display: inline-block;
  position: relative;
  ${p => p.isLoading && css`
    img {
      filter: brightness(0.5);
    }
  `}
`;

const HiddenInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
`;

const Loader = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  color: white;
  z-index: 10;

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
