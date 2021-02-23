/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router';
import { useStore, observer } from '../../stores';
import Photo from './Photo';
import Input from '../Input';
import Icon from '../Icon';
import LoungeSelector, { useSelector } from '../LoungeSelector';
import PhotoUploader from '../PhotoUploader';
import APIS from '../../apis';
import BackHeader from '../Header/BackHeader';
import { colors } from '../../styles';

const ModificationForm = () => {
  const { user, util, ui } = useStore();
  const location = useLocation();
  const {
    preUploadUrl,
    profileUrl,
    setProfileUrl,
    setPreUploadUrl,
  } = PhotoUploader.usePhotoUPloader(user.profile.profileImage);
  const nicknameSkip = (value: string) => value.length > 10;
  const [name, onChangeName] = Input.useTextField(
    user.profile.name,
    nicknameSkip,
  );
  const [group, setGroup] = useSelector(
    user.profile.group,
  );
  const descriptionSkip = (value: string) => value.length > 80;
  const [description, onChangeDescription] = Input.useTextField(
    user.profile.description ?? '',
    descriptionSkip,
  );
  const [loading, setLoading] = React.useState(false);
  const setProfile = React.useCallback((url: string) => {
    setProfileUrl(url);
    setLoading(false);
  }, [])

  const handleSetPreLoadImage = (preLoadImage: string) => {
    setPreUploadUrl(preLoadImage);
    setLoading(true);
  }

  React.useEffect(() => {
    if (location.state && 'focus' in location.state) {
      const focusedElement = document.querySelector(`#${location.state['focus']}`);
      if (focusedElement) {
        (focusedElement as HTMLElement).focus();
      }
    }
  }, [location.state])

  const handleSubmit = React.useCallback(async () => {
    try {
      await APIS.user.update({
        name,
        group,
        profileImage: profileUrl,
        description,
      });
      user.profile = {
        ...user.profile,
        name,
        group,
        profileImage: profileUrl,
        description,
      };
      util.history.goBack();
    } catch (error) {
      console.log(error);
    }
  }, [description, group, name, user.profile, profileUrl]);

  const disabled = 
    loading &&
    user.profile.profileImage === profileUrl &&
    user.profile.name === name &&
    user.profile.group === group && 
    user.profile.description === description;

  return (
    <React.Fragment>
      <Header 
        options={{ title: "프로필 수정", right: (
          <SubmitButton
            icon="vCheck"
            size="24px"
            color={colors.black22}
            onClick={handleSubmit}
            disabled={disabled}
          />
        )}} 
        desktop={!ui.queryMatch.Mobile}
      />
      <Form>
        <ImageUploader
          isLoading={loading}
          setProfileUrl={setProfile}
          setPreUploadUrl={handleSetPreLoadImage}
        >
          <PHotoUploaderButton>
            <StyledPhoto size={72} src={preUploadUrl || profileUrl} />
            <CameraIcon icon="camera" size="24px" />
          </PHotoUploaderButton>
        </ImageUploader>
        <InputBox
          id="ProfileNickname"
          onChange={onChangeName}
          value={name}
          placeholder="닉네임을 입력해주세요"
          label="닉네임"
          maxLength={10}
        />
        <Selector label="업종" selected={group} setSelected={setGroup} myLounge={user.profile.group}/>
        <InputBox
          id="ProfileIntoduction"
          onChange={onChangeDescription}
          value={description}
          label="소개"
          rows={3}
          maxLength={80}
        />
      </Form>
    </React.Fragment>
  );
};

export default observer(ModificationForm);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 26px 18px;
  background-color: ${colors.white};
  overflow-y: auto;
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
  #ProfileIntoduction {
    height: 127px;
  }
  & + & {
    margin: 0;
  }
`;

const ImageUploader = styled(PhotoUploader.Uploader)`
  width: fit-content;
  margin: 0 auto;
`;

const Selector = styled(LoungeSelector)`
  margin: 12px 0 0 0;
  padding: 13px 0;

  .Selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 48px;
    margin: 12px 0 0 0;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    background-color: ${colors.transparent};
    color: ${colors.black22};
    font-size: 16px;
    line-height: 1.5;
  }
`;

const Header = styled(BackHeader)<{ desktop: boolean }>`
  ${p => p.desktop && css`
    .Icon.back {
      display: none;
    }
  `}
`;

const SubmitButton = styled(Icon)<{ disabled: boolean}>`
  ${p => p.disabled && css`
    pointer-events: none;
    color: ${colors.blackAA};
  `}
`;