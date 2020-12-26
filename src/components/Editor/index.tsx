/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { useTextarea } from '../../hooks';
import Selector, { useSelector } from '../Selector';
import PhotoUploader from '../PhotoUploader';
import Icon from '../Icon';
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
  article?: Article;
  syncArticle: (article: Article) => void;
  onClose: () => void;
}

export default function Editor(props: EditorProps): JSX.Element {
  const { article, syncArticle, onClose } = props;
  const [selected, setSelected] = useSelector(
    selects,
    article?.group ?? '자유',
  );
  const [title, setTitle] = useTextarea(article?.title ?? '');
  const [content, setContent] = useTextarea(article?.content ?? '');
  const [uploadedUrl, setUploadedUrl] = React.useState(article?.photos ?? '');
  const [preUploadUrl, setPreUploadUrl] = React.useState(article?.photos ?? '');

  const handleClickPost = React.useCallback(async () => {
    if (title.length === 0 || content.length === 0) return;
    try {
      const { data } = await API.article.write({
        title,
        content,
        group: selected,
        photos: uploadedUrl,
      });
      syncArticle(data.article);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, syncArticle, onClose]);

  const handleClickUpdate = React.useCallback(async () => {
    if (title.length === 0 || content.length === 0 || !article) return;
    try {
      const { data } = await API.article.update(article.id, {
        title,
        content,
        group: selected,
        photos: uploadedUrl,
      });
      syncArticle(data.article);
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
        <PhotoUploader.Uploader
          setUploadedUrl={setUploadedUrl}
          setPreUploadUrl={setPreUploadUrl}
        >
          <Styled.UploadButton
            onClick={() => {
              console.log('UploadButton click');
            }}
            icon={<Icon icon="image" size="24px" />}
          />
        </PhotoUploader.Uploader>
      </Styled.Tools>
      <Styled.SendButton disabled={disabledWrite} onClick={handleSubmit}>
        {article ? '수정' : '작성'}
      </Styled.SendButton>
    </Styled.Page>
  );
}
