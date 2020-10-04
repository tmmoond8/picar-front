/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { colors } from '../styles';
import { useTextarea } from '../hooks';
import Selector, { useSelector } from '../components/Selector';
import Button from '../components/Button';
import HR from '../components/HR';
import Icon from '../components/Icon';
import { observer, useStore } from '../stores';
import API from '../apis';

const dummySelect = ['자유', '유머', '정부지원', '요식업'];

export default observer(function WritePage(): JSX.Element {
  const history = useHistory();
  const { ui, article } = useStore();
  const [selected, setSelected] = useSelector(dummySelect, '자유');
  const [title, setTitle] = useTextarea('');
  const [content, setContent] = useTextarea('');

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

  const handleClickImage = React.useCallback(() => {
    console.log(title);
  }, [title]);

  return (
    <Page>
      <Selector items={dummySelect} handleChange={setSelected} />
      <Title
        value={title}
        onChange={setTitle}
        placeholder="제목을 입력하세요."
      />
      <HR marginTop={30} />
      <Content
        value={content}
        onChange={setContent}
        placeholder="내용을 입력하세요."
      />
      <HR full />
      <Tools>
        <Button
          onClick={handleClickImage}
          icon={<Icon icon="image" size="24px" />}
        ></Button>
      </Tools>
      <SendButton onClick={handleClickPost}>게시</SendButton>
    </Page>
  );
});

const SendButton = styled.button`
  position: fixed;
  right: 18px;
  top: 18px;
  font-size: 16px;
`;

const Page = styled.section`
  padding: 24px 18px 34px;
`;

const Title = styled.textarea`
  width: 100%;
  height: auto;
  max-height: 72px;
  margin-top: 30px;
  overflow: hidden;

  outline: none;
  border: none;
  color: ${colors.black100};
  font-size: 17px;
  line-height: 24px;
  resize: none;
`;

const Content = styled.textarea`
  position: relative;
  flex: 1;
  width: 100%;
  height: 312px;
  margin-top: 21px;

  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  resize: none;
  &::placeholder {
    color: ${colors.black99};
  }
  outline: none;
  border: none;
`;

const Tools = styled.div`
  display: flex;
  padding: 14px 0;
  button {
    border: none;
    padding: 0;
  }
`;
