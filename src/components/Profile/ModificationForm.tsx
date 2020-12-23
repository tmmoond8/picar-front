/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Photo from './Photo';
import Input from '../Input';
import Icon from '../Icon';
import PhotoUploader from '../PhotoUploader';
import APIS from '../../apis';
import { colors } from '../../styles';

const ModificationForm: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { user } = useStore();
  const {
    uploadedUrl,
    preUploadUrl,
    setUploadedUrl,
    setPreUploadUrl,
  } = PhotoUploader.usePhotoUPloader(user.profile.profileImage);
  const nicknameSkip = (value: string) => value.length > 10;
  const [name, onChangeName] = Input.useTextField(
    user.profile.name,
    nicknameSkip,
  );
  const [group, onChangeGroup] = Input.useTextField(user.profile.group || '');
  const descriptionSkip = (value: string) => value.length > 80;
  const [description, onChangeDescription] = Input.useTextField(
    user.profile.description ||
      `삼산텍을 창업하고 소프트웨어 엔지니어로
    일하고 있습니다. AI기술로 세상을 바꾸고 싶습니다`,
    descriptionSkip,
  );

  const handleSubmit = React.useCallback(async () => {
    try {
      await APIS.user.update({
        name,
        group,
        profileImage: uploadedUrl,
        description,
      });
      user.profile = {
        ...user.profile,
        name,
        group,
        profileImage: uploadedUrl,
        description,
      };
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }, [description, group, handleClose, name, uploadedUrl, user.profile]);

  return (
    <Form>
      <ImageUploader
        setUploadedUrl={setUploadedUrl}
        setPreUploadUrl={setPreUploadUrl}
      >
        <PHotoUploaderButton>
          <StyledPhoto size={72} src={preUploadUrl} />
          <CameraIcon icon="camera" size="24px" />
        </PHotoUploaderButton>
      </ImageUploader>
      <InputBox
        id="profile-nickname"
        onChange={onChangeName}
        value={name}
        placeholder="닉네임을 입력해주세요"
        label="닉네임"
        maxLength={10}
      />
      <InputBox
        id="profile-group"
        onChange={onChangeGroup}
        value={group}
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
      <SubmitButton
        icon="vCheck"
        size="24px"
        color={colors.black22}
        onClick={handleSubmit}
      />
    </Form>
  );
};

export default observer(ModificationForm);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 26px 18px;
`;

const PHotoUploaderButton = styled.div`
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

const SubmitButton = styled(Icon)`
  position: absolute;
  top: 18px;
  right: 22px;
`;

const ImageUploader = styled(PhotoUploader.Uploader)`
  width: fit-content;
  margin: 0 auto;
`;
