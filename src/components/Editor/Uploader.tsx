/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import API from '../../apis';
import Button from '../Button';
import Icon from '../Icon';

interface UploaderProps {
  setUploadedUrl: (imgUrl: string) => void;
  setPreUploadUrl: (preUploadUrl: string) => void;
}

export default function Uploader(props: UploaderProps) {
  const { setUploadedUrl, setPreUploadUrl } = props;
  const fileRef = React.useRef<HTMLInputElement>(null);

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
        console.log(tempImage.imgUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Button
      onClick={() => {
        if (fileRef?.current) {
          fileRef.current.click();
        }
      }}
      icon={<Icon icon="image" size="24px" />}
    >
      <input
        ref={fileRef}
        hidden
        type="file"
        onChange={handleChangeFile}
        onError={(e) => {
          (e.target as HTMLInputElement).value = '';
          console.log('Error: ', e);
        }}
      />
    </Button>
  );
}
