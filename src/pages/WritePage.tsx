/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useTextarea } from '../hooks';
import Selector, { useSelector } from '../components/Selector';

import HR from '../components/HR';
import Editor from '../components/Editor';
import { observer, useStore } from '../stores';
import API from '../apis';

const dummySelect = ['자유', '유머', '정부지원', '요식업'];

export default observer(function WritePage(): JSX.Element {
  const history = useHistory();
  const { ui, article } = useStore();
  const [selected, setSelected] = useSelector(dummySelect, '자유');
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
      });

      article.articles = [...article.articles, data.article];
      history.goBack();
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, article.articles, history]);

  ui.setHeaderClose({});

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);

  return (
    <Editor.Page>
      <Selector items={dummySelect} handleChange={setSelected} />
      <Editor.Title
        value={title}
        onChange={setTitle}
        placeholder="제목을 입력하세요."
      />
      <HR marginTop={30} />
      <Editor.Content
        value={content}
        onChange={setContent}
        placeholder="내용을 입력하세요."
      />
      {preUploadUrl && (
        <Editor.Image
          uploadedUrl={uploadedUrl}
          preUploadUrl={preUploadUrl}
          clear={handleImageClear}
        />
      )}
      <HR full />
      <Editor.Tools>
        <Editor.Uploader
          setUploadedUrl={setUploadedUrl}
          setPreUploadUrl={setPreUploadUrl}
        />
      </Editor.Tools>
      <Editor.SendButton onClick={handleClickPost}>게시</Editor.SendButton>
    </Editor.Page>
  );
});
