/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import { useStore } from '../../stores';
import { AllLoungeList, useSelector } from '../LoungeSelector';

import Icon from '../Icon';
import HR from '../HR';
import EditorContext from './context';
import Styled from './Styled';
import Selector from './Selector';
import Header from './Header';
import Title from './Title';
import Content from './Content';
import Carousel from '../Carousel';
import API from '../../apis';
import Article from '../../types/Article';
import { CAROUSEL } from '../../types/constants';
import { colors } from '../../styles';
import PhotoUploader from '../PhotoUploader';

const Editor: React.FC<{
  article?: Article;
  group: string;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}> = ({ article, group, syncArticle, onClose }) => {
  const { util, user } = useStore();
  const history = util.useHistory();
  const [selected, setSelected] = useSelector(article?.group ?? group);
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
      <EditorContext.Provider value={{
        article,
        title,
        content,
        selected,
        step,
        onClose,
        setStep,
        setTitle,
        setContent,
        setSelected,
        HeaderRight,
      }}>
        <Header />
        <Carousel 
          id={CAROUSEL.EDITOR}
          index={step}
          gesture={false}
          onChangeIndex={() => {}}
        >
          <Styled.Form className="Form">
            <Selector />
            <Title />
            <HR marginTop={30} />
            <Content />
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
      </EditorContext.Provider>
    </Styled.Page>
  );
};

export default Editor;

const AllLounges = styled(AllLoungeList)`
  width: 100%;
  height: 100%;
`;