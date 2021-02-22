/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
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

import Article from '../../types/Article';
import { CAROUSEL } from '../../types/constants';
import PhotoUploader from '../PhotoUploader';

const Editor: React.FC<{
  article?: Article;
  group: string;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}> = ({ article, group, syncArticle, onClose }) => {
  const { user } = useStore();
  
  const [ selected, setSelected ] = useSelector(article?.group ?? group);
  const [ step, setStep ] = React.useState(0);
  const [ title, setTitle ] = React.useState(article?.title ?? '');
  const [ content, setContent ] = React.useState(article?.content ?? '');
  const [ photos, setPhotos ] = React.useState(article?.photos ?? '');
  const [ thumbnail, setThumbnail ] = React.useState(article?.thumbnail ?? '');
  const { 
    uploadedUrl,
    preUploadUrl,
    thumbnailUrl,
    setUploadedUrl,
    setPreUploadUrl,
    setThumbnailUrl 
  } = PhotoUploader.usePhotoUPloader(article?.photos);

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);
  
  const handleGoBack = React.useCallback(() => {
    setStep(step - 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step - 1);
  }, [step])
  
  const handleSelect = React.useCallback((selected: string) => {
    setSelected(selected);
    handleGoBack();
  }, [handleGoBack])


  return (
    <Styled.Page className="EditorPage">
      <EditorContext.Provider value={{
        article,
        title,
        content,
        selected,
        step,
        photos: uploadedUrl ?? '',
        thumbnail: thumbnailUrl ?? '',
        onClose,
        setStep,
        setTitle,
        setContent,
        setSelected,
        syncArticle,
        setPhotos,
        setThumbnail,
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