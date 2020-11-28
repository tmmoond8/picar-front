/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { useTextarea } from '../../hooks';
import Selector, { useSelector } from '../Selector';

import HR from '../HR';
import Styled from './Styled';
import API from '../../apis';
import { NAVIGATIONS, LOUNGES, LOUNGE } from '../../types/constants';
import Article from '../../types/Article';

const selects = [
  ...NAVIGATIONS.filter((navigation) => navigation.name !== LOUNGE).map(
    (navigation) => navigation.name,
  ),
  ...LOUNGES.map((lounge) => lounge.name),
];

interface EditorProps {
  appendArticle: (article: Article) => void;
  onClose: () => void;
}

export default function Editor(props: EditorProps): JSX.Element {
  const { appendArticle, onClose } = props;
  const [selected, setSelected] = useSelector(selects, '자유');
  const [title, setTitle] = useTextarea('');
  const [content, setContent] = useTextarea('');
  const [uploadedUrl, setUploadedUrl] = React.useState('');
  const [preUploadUrl, setPreUploadUrl] = React.useState('');

  const handleClickPost = React.useCallback(async () => {
    console.log('write');
    if (title.length === 0 || content.length === 0) return;
    try {
      const { data } = await API.article.write({
        title,
        content,
        group: selected,
        photos: uploadedUrl,
      });
      appendArticle(data.article);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, appendArticle, onClose]);

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);

  const disabledWrite = React.useMemo(() => {
    return title.length === 0 || content.length === 0;
  }, [content.length, title.length]);

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
      <Styled.SendButton disabled={disabledWrite} onClick={handleClickPost}>
        작성
      </Styled.SendButton>
    </Styled.Page>
  );
}
