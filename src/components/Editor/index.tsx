/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore } from '../../stores';
import { LoungeList, useSelector } from '../LoungeSelector';

import HR from '../HR';
import EditorContext from './context';
import Styled from './Styled';
import Selector from './Selector';
import Header from './Header';
import Title from './Title';
import PhotoSection from './PhotoSection';
import Content from './Content';
import Carousel from '../Carousel';

import Article from '../../types/Article';
import { CAROUSEL } from '../../types/constants';

const Editor: React.FC<{
  article?: Article;
  group: string;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}> = ({ article, group, syncArticle, onClose }) => {
  const { user } = useStore();
  const [selected, setSelected] = useSelector(article?.group ?? group);
  const [step, setStep] = React.useState(0);
  const [title, setTitle] = React.useState(article?.title ?? '');
  const [content, setContent] = React.useState(article?.content ?? '');
  const [photos, setPhotos] = React.useState(article?.photos ?? '');
  const [thumbnail, setThumbnail] = React.useState(article?.thumbnail ?? '');
  const [isOnImageUpload, setIsOnImageUpload] = React.useState(false);

  const handleGoBack = React.useCallback(() => {
    setStep(step - 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step - 1);
  }, [step]);

  const handleSelect = React.useCallback(
    (selected: string) => {
      setSelected(selected);
      handleGoBack();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleGoBack],
  );

  return (
    <Styled.Page className="EditorPage">
      <EditorContext.Provider
        value={{
          article,
          title,
          content,
          selected,
          step,
          photos,
          thumbnail,
          isOnImageUpload,
          onClose,
          setStep,
          setTitle,
          setContent,
          setSelected,
          syncArticle,
          setPhotos,
          setThumbnail,
          setIsOnImageUpload,
        }}
      >
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
            <PhotoSection />
          </Styled.Form>
          <Lounges
            handleSelect={handleSelect}
            myLounge={user.profile.group}
            all
          />
        </Carousel>
      </EditorContext.Provider>
    </Styled.Page>
  );
};

export default Editor;

const Lounges = styled(LoungeList)`
  width: 100%;
  height: 100%;
`;
