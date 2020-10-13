/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useTextarea } from '../../hooks';
import Selector, { useSelector } from '../Selector';

import HR from '../HR';
import Styled from './Styled';
import API from '../../apis';
import { NAVIGATIONS, ROUNGES, ROUNGE } from '../../types/constants';
import Article from '../../types/Article';
import { article } from '../../stores';

const selects = [
  ...NAVIGATIONS.filter((navigation) => navigation.name !== ROUNGE).map(
    (navigation) => navigation.name,
  ),
  ...ROUNGES.map((rounge) => rounge.name),
];

interface EditorProps {
  appendArticle: (article: Article) => void;
}

export default function Editor(props: EditorProps): JSX.Element {
  const { appendArticle } = props;
  const history = useHistory();
  const [selected, setSelected] = useSelector(selects, '자유');
  const [title, setTitle] = useTextarea('');
  const [content, setContent] = useTextarea('');
  const [uploadedUrl, setUploadedUrl] = React.useState('');
  const [preUploadUrl, setPreUploadUrl] = React.useState('');

  const handleClickPost = React.useCallback(async () => {
    try {
      const { data } = await API.article.post({
        title,
        content,
        group: selected,
        photos: uploadedUrl,
      });
      appendArticle(data.article)
      history.goBack();
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, appendArticle, history]);

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);

  return (
    <Styled.Page>
      <Selector items={selects} handleChange={setSelected} />
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
        <Styled.Uploader
          setUploadedUrl={setUploadedUrl}
          setPreUploadUrl={setPreUploadUrl}
        />
      </Styled.Tools>
      <Styled.SendButton onClick={handleClickPost}>작성</Styled.SendButton>
    </Styled.Page>
  );
};
