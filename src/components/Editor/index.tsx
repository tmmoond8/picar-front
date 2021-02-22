/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import { useStore } from '../../stores';
import { AllLoungeList, useSelector } from '../LoungeSelector';
import PhotoUploader from '../PhotoUploader';
import Icon from '../Icon';
import HR from '../HR';
import Styled from './Styled';
import Content from './Content';
import Carousel from '../Carousel';
import API from '../../apis';
import Article from '../../types/Article';
import { CAROUSEL } from '../../types/constants';
import { colors } from '../../styles';

const Editor: React.FC<{
  article?: Article;
  group: string;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}> = ({ article, group, syncArticle, onClose }) => {
  const { util, user } = useStore();
  const history = util.useHistory();
  const [selected, setSelected] = useSelector(
    article?.group ?? group,
  );
  const [step, setStep] = React.useState(0);
  const [title, setTitle] = React.useState(article?.title ?? '');
  const [content, setContent] = React.useState(article?.content ?? '');
  
  const { 
    uploadedUrl,
    preUploadUrl,
    thumbnailUrl,
    setUploadedUrl,
    setPreUploadUrl,
    setThumbnailUrl 
  } = PhotoUploader.usePhotoUPloader(article?.photos);

  const validate = React.useCallback(() => {
    if (title.length === 0) {
      toast.success('제목을 입력하세요.');
      return false;
    }
    if (content.length === 0) {
      toast.success('내용을 입력하세요.')
      return false;
    }
    return true;
  }, [title, content])

  const handleClickPost = React.useCallback(async () => {
    if (!validate()) return;
    try {
      const { data } = await API.article.write({
        title,
        content,
        group: selected,
        photos: uploadedUrl,
        thumbnail: uploadedUrl ? thumbnailUrl : '',
      });
      syncArticle(data.article);
      onClose();
      setTimeout(() => {
        history.push(`/article/${data.article.id}`);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, syncArticle, onClose, history]);

  const handleClickUpdate = React.useCallback(async () => {
    if (!validate() || !article) return;
    try {
      const { data } = await API.article.update(article.id, {
        title,
        content,
        group: selected,
        photos: uploadedUrl,
        thumbnail: uploadedUrl ? thumbnailUrl : '',
      });
      if (data.ok) {
        syncArticle(data.article);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [title, content, article, selected, uploadedUrl, syncArticle, onClose]);

  const handleKeyDownTitle = React.useCallback((e) => {
    const allowedKeys = [ 8, 16, 17, 18, 27, 37, 38, 39, 40, 46, 91, 93 ];
    if (e.keyCode === 13 || (title.length > 32 && !allowedKeys.includes(e.keyCode))) {
      e.preventDefault();
    }
  }, [title])

  const handleSetTitle = React.useCallback((title: string) => {
    setTitle(title.slice(0, 32))
  }, [setTitle]);

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);

  const disabledWrite = React.useMemo(() => {
    return title.length === 0 || content.length === 0;
  }, [content.length, title.length]);

  const handleSubmit = React.useMemo(() => {
    return article ? handleClickUpdate : handleClickPost;
  }, [article, handleClickPost, handleClickUpdate]);

  const handleGoBack = React.useCallback(() => {
    setStep(step - 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step - 1);
  }, [step])
  const handleNext = React.useCallback(() => {
    setStep(step + 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step + 1);
  }, [step])

  const handleSelect = React.useCallback((selected: string) => {
    setSelected(selected);
    handleGoBack();
  }, [handleGoBack])

  const HeaderRight = (
    <Styled.SendButton onClick={handleSubmit}>
      <Icon 
        icon="vCheck" 
        size="24px" 
        color={disabledWrite ? colors.blackEB : colors.black22}
      />
    </Styled.SendButton>
  )

  return (
    <Styled.Page className="EditorPage">
      <Header 
        title={article ? '글 수정' : '글 작성'}
        onBack={handleGoBack}
        onClose={onClose}
        step={step}
        right={HeaderRight}
        hideRight={step !== 0}
      />
      <Carousel 
        id={CAROUSEL.EDITOR}
        index={step}
        onChangeIndex={() => {}}
      >
        <Styled.Form className="Form">
          <Styled.Selector onClick={handleNext}>
            {selected}
            <Icon icon="arrowDown" size="16px"/>
          </Styled.Selector>
          <Styled.Title
            name="Title"
            text={title} 
            onKeyDown={handleKeyDownTitle}
            setText={handleSetTitle}
            placeholder={title.length > 0 ? '' : '제목을 입력하세요.'}
          />
          <HR marginTop={30} />
          <Content content={content}  setContent={setContent} />
          {preUploadUrl && (
            <Styled.Image
              uploadedUrl={uploadedUrl}
              preUploadUrl={preUploadUrl}
              clear={handleImageClear}
            />
          )}
          <HR full marginTop={24}/>
          <Styled.Tools>
            <PhotoUploader.Uploader
              isLoading={false}
              setUploadedUrl={setUploadedUrl}
              setPreUploadUrl={setPreUploadUrl}
              setThumbnailUrl={setThumbnailUrl}
            >
              <Styled.UploadButton
                onClick={() => {
                  console.log('UploadButton click');
                }}
                icon={<Icon icon="image" size="24px" />}
              />
            </PhotoUploader.Uploader>
          </Styled.Tools>
        </Styled.Form>
        <AllLounges handleSelect={handleSelect} myLounge={user.profile.group}/>
      </Carousel>
    </Styled.Page>
  );
};

export default Editor;

const AllLounges = styled(AllLoungeList)`
  width: 100%;
  height: 100%;
`;

const Header = styled(Carousel.Header)<{ hideRight: boolean}>`
  ${p => p.hideRight && css`
    .right {
      display: none;
    }
  `}
`;