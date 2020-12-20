/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Photo from './Photo';
import Input from '../Input';
import Icon from '../Icon';

const ModificationForm = ({}) => {
  const {
    user: { profile },
  } = useStore();
  const handleUploadImage = React.useCallback(() => {}, []);
  const nicknameSkip = (value: string) => value.length > 10;
  const [name, onChangeName] = Input.useTextField(profile.name, nicknameSkip);
  const [lounge, onChangeLounge] = Input.useTextField(profile.group || '');
  const descriptionSkip = (value: string) => value.length > 80;
  const [description, onChangeDescription] = Input.useTextField(
    profile.description ||
      `삼산텍을 창업하고 소프트웨어 엔지니어로
    일하고 있습니다. AI기술로 세상을 바꾸고 싶습니다`,
    descriptionSkip,
  );

  return (
    <Form>
      <PhotoUploader onClick={handleUploadImage}>
        <StyledPhoto size={72} />
        <CameraIcon icon="camera" size="24px" />
      </PhotoUploader>
      <InputBox
        id="profile-nickname"
        onChange={onChangeName}
        value={name}
        placeholder="닉네임을 입력해주세요"
        label="닉네임"
        maxLength={10}
      />
      <InputBox
        id="profile-lounge"
        onChange={onChangeLounge}
        value={lounge}
        label="업종"
      />
      <InputBox
        id="profile-description"
        onChange={onChangeDescription}
        value={description}
        label="소개"
        rows={3}
        maxLength={80}
      />
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

const InputBox = styled(Input.TextFieldOutline)`
  margin: 14px 0 0 0;
  & + & {
    margin: 0;
  }
`;
