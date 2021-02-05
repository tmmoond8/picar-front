/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import API from '../../apis';

const Uploader: React.FC<{
  className?: string;
  children: React.ReactNode;
  setUploadedUrl: (imgUrl: string) => void;
  setPreUploadUrl: (preUploadUrl: string) => void;
}> = ({ className, children, setUploadedUrl, setPreUploadUrl }) => {
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);
  const handleChangeFile = async (event: React.ChangeEvent) => {
    event.preventDefault();
    const fileElement = event.target as HTMLInputElement;
    const files = fileElement.files;

    if (files && files.length > 0) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => setPreUploadUrl(reader!.result!.toString());

        const tempImage = await API.imageUpload(files[0]);
        setUploadedUrl(tempImage.imgUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StyledUploader className={className} onClick={() => {
      if(hiddenInputRef.current) {
        hiddenInputRef.current.click();
      }
    }}>
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

const StyledUploader = styled.div`
  display: inline-block;
  position: relative;
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
