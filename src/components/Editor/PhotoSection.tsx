/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Image from './Image';
import HR from '../HR';
import Icon from '../Icon';
import Button from '../Button';
import API from '../../apis';
import PhotoUploader from '../PhotoUploader';
import { useEditorContext, observer } from './context';

const PhotoSection: React.FC = () => {
  const { photos, setPhotos, setThumbnail, setIsOnImageUpload } = useEditorContext();
  const [postImages, setPostImages] = React.useState<(string)[]>(photos ? photos.split(',') : []);
  const [preUploads, setPreUploades] = React.useState<(string)[]>(photos ? photos.split(',') : []);
  const [isOnThumnbailUpload, setIsOnThumnbailUpload] = React.useState(false);
  const nextIndex = React.useMemo(() => {
    return Math.max(postImages.filter(p => !!p).length, preUploads.filter(p => !!p).length)
  }, [postImages, preUploads])

  const handleClear = (index: number) => {
    setPostImages([...postImages.slice(0, index), ...postImages.slice(index + 1)]);
    setPreUploades([...preUploads.slice(0, index), ...preUploads.slice(index + 1)]);
  }

  const setUploadUrl = (index: number, uploadUrl: string) => {
    postImages[index] = uploadUrl;
    setPostImages([...postImages]);
  }
  const setPreUploadUrl = (index: number, preLoadingImage: string) => {
    preUploads[index] = preLoadingImage;
    setPreUploades([...preUploads]);
  }

  React.useEffect(() => {
    setPhotos(postImages.join(','))
  }, [postImages]);

  React.useEffect(() => {
    const firstImage = photos.split(',')[0];
    if (firstImage) {
      setIsOnThumnbailUpload(true);
      API.imageUpload(firstImage, 'picar_thumbnail')
        .then(thumbnail => {
          setThumbnail(thumbnail.imgUrl);
          setIsOnThumnbailUpload(false);
        })
    }
  }, [photos.split(',')[0]]);

  React.useEffect(() => {
    setIsOnImageUpload(isOnThumnbailUpload || (postImages.length !== preUploads.length))
  }, [postImages, preUploads, isOnThumnbailUpload]);

  return (
    <React.Fragment>
      <PhotoRow>
        {preUploads.filter(img => !!img).map((_, index) => (
          <li key={`${preUploads[index]}`} >
            <Image
              isOnThumnbailUpload={index === 0 && isOnThumnbailUpload}
              photoUrl={postImages[index]}
              preUploadUrl={preUploads[index]}
              clear={() => handleClear(index)}
            />
          </li>
        ))}
      </PhotoRow>
      <HR full marginTop={15} />
      <Tools>
        <PhotoUploader.Uploader
          setPreUploadUrl={(preloadingUrl: string) => setPreUploadUrl(nextIndex, preloadingUrl)}
          setUploadedUrl={(uploadUrl: string) => setUploadUrl(nextIndex, uploadUrl)}
        >
          <UploadButton
            onClick={() => {
              console.log('UploadButton click');
            }}
            icon={<Icon icon="image" size="24px" />}
          />
        </PhotoUploader.Uploader>
      </Tools>
    </React.Fragment>
  )
}

export default observer(PhotoSection);

const Tools = styled.div`
  display: flex;
  padding: 14px 0;
  button {
    border: none;
    padding: 0;
  }
`;

const UploadButton = styled(Button)`
  .Icon {
    cursor: pointer;
  }
`;

const PhotoRow = styled.ul`
  display: flex;
  padding: 12px 0 0 0;
  overflow-x: auto;
  li + li {
    margin: 0 0 0 14px;
  }
`;