import { useState} from 'react';

const emptyImage = 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1602416151/noticon/qrsmk8pitzmkulkrdid2.png';

export const usePhotoUPloader = (defaultImage?: string) => {
  const [uploadedUrl, setUploadedUrl ] = useState(defaultImage ?? emptyImage);
  const [preUploadUrl, setPreUploadUrl] = useState(defaultImage ?? emptyImage);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultImage ?? emptyImage);
  const [profileUrl, setProfileUrl] = useState(defaultImage ?? emptyImage);
  return {
    uploadedUrl, setUploadedUrl, preUploadUrl, setPreUploadUrl, thumbnailUrl, setThumbnailUrl, profileUrl, setProfileUrl,
  }
}