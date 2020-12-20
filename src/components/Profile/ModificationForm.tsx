/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Photo from './Photo';
import Icon from '../Icon';

const ModificationForm = ({}) => {
  const {} = useStore();
  const handleUploadImage = React.useCallback(() => {}, []);

  return (
    <Form>
      <PhotoUploader onClick={handleUploadImage}>
        <StyledPhoto size={72} />
        <CameraIcon icon="camera" size="24px" />
      </PhotoUploader>
    </Form>
  );
};

export default observer(ModificationForm);

const Form = styled.form`
  padding: 26px 18px;
`;

const PhotoUploader = styled.div`
  position: relative;
  padding: 6px 0;
  text-align: center;
`;

const StyledPhoto = styled(Photo)`
  border-radius: 26px;
  cursor: pointer;
`;

const CameraIcon = styled(Icon)`
  position: absolute;
  left: calc(50% + 16px);
  top: calc(50% + 12px);
`;
