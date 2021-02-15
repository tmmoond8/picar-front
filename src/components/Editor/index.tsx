/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import { useStore } from '../../stores';
import { useTextarea } from '../../hooks';
import { AllLoungeList, useSelector } from '../LoungeSelector';
import PhotoUploader from '../PhotoUploader';
import Icon from '../Icon';
import HR from '../HR';
import Styled from './Styled';
import Carousel from '../Carousel';
import API from '../../apis';
import Article from '../../types/Article';
import { CAROUSEL } from '../../types/constants';

const Editor: React.FC<{
  article?: Article;
  group: string;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}> = ({ article, group, syncArticle, onClose }) => {
  const { util } = useStore();
  const history = util.useHistory();
  const [selected, setSelected] = useSelector(
    article?.group ?? group,
  );
  const [step, setStep] = React.useState(0);
  const [title, setTitle] = useTextarea(article?.title ?? '');
  const [content, setContent] = useTextarea(article?.content ?? '');
  const { 
    uploadedUrl,
    preUploadUrl,
    thumbnailUrl,
    setUploadedUrl,
    setPreUploadUrl,
    setThumbnailUrl 
  } = PhotoUploader.usePhotoUPloader(article?.photos?.thumbnail ?? undefined);

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
        photos: [{
          thumbnail: thumbnailUrl,
          photo: uploadedUrl,
        }],
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
        photos: [{
          thumbnail: thumbnailUrl,
          photo: uploadedUrl,
        }],
      });
      if (data.ok) {
        syncArticle(data.article);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [title, content, article, selected, uploadedUrl, syncArticle, onClose]);

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
      {article ? '수정' : '작성'}
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
        gesture={false}
      >
        <Styled.Form className="Form">
          <Styled.Selector onClick={handleNext}>{selected}</Styled.Selector>
          <Styled.Title
            value={title}
            onChange={setTitle}
            placeholder="제목을 입력하세요."
          />
          <HR marginTop={30} />
          <Styled.Content
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요."
          />
          {preUploadUrl && (
            <Styled.Image
              uploadedUrl={uploadedUrl}
              preUploadUrl={preUploadUrl}
              clear={handleImageClear}
            />
          )}
          <HR full />
          <Styled.Tools>
            <PhotoUploader.Uploader
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
        <AllLounges handleSelect={handleSelect}/>
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