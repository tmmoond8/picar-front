/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { useStore } from '../../stores';
import { useTextarea } from '../../hooks';
import Selector, { useSelector } from '../LoungeSelector';
import PhotoUploader from '../PhotoUploader';
import Icon from '../Icon';
import HR from '../HR';
import Styled from './Styled';
import API from '../../apis';
import { NAVIGATIONS, LOUNGES, LOUNGE } from '../../types/constants';
import Article from '../../types/Article';

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
      setTimeout(() => {
        history.push(`/article/${data.article.id}`);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, syncArticle, onClose, history]);

  const handleClickUpdate = React.useCallback(async () => {
    if (title.length === 0 || content.length === 0 || !article) return;
    try {
      const { data } = await API.article.update(article.id, {
        title,
        content,
        group: selected,
        photos: uploadedUrl,
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

  return (
    <Styled.Page>
      <Selector selected={selected} setSelected={setSelected} />
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
};

export default Editor;
