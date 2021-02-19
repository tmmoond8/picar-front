import { useState} from 'react';

const emptyImage = undefined;

export const usePhotoUPloader = (defaultImage?: string) => {
  const [uploadedUrl, setUploadedUrl ] = useState(defaultImage);
  const [preUploadUrl, setPreUploadUrl] = useState(defaultImage);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultImage);
  const [profileUrl, setProfileUrl] = useState(defaultImage);
  return {
    uploadedUrl, setUploadedUrl, preUploadUrl, setPreUploadUrl, thumbnailUrl, setThumbnailUrl, profileUrl, setProfileUrl,
  }
}