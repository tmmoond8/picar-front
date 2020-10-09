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
import { NAVIGATIONS, ROUNGES, ROUNGE } from '../types/constants';

const selects = [
  ...NAVIGATIONS.filter((navigation) => navigation.name !== ROUNGE).map(
    (navigation) => navigation.name,
  ),
  ...ROUNGES.map((rounge) => rounge.name),
];

export default observer(function WritePage(): JSX.Element {
  const history = useHistory();
  const { ui, article } = useStore();
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

      article.articles = [...article.articles, data.article];
      history.goBack();
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, uploadedUrl, article.articles, history]);

  ui.setHeaderClose({});

  const handleImageClear = React.useCallback(() => {
    setUploadedUrl('');
    setPreUploadUrl('');
  }, [setUploadedUrl, setPreUploadUrl]);

  return (
    <Editor.Page>
      <Selector items={selects} handleChange={setSelected} />
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
      <Editor.SendButton onClick={handleClickPost}>작성</Editor.SendButton>
    </Editor.Page>
  );
});
