/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../styles';
import { useTextarea } from '../hooks';
import Selector, { useSelector } from '../components/Selector';
import Button from '../components/Button';
import HR from '../components/HR';
import Icon from '../components/Icon';

const dummy = {
  items: ['자유', '유머', '정부지원', '요식업'],
  title:
    '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하',
  content: `이번주 대목을 앞두고 장사를 말아먹었거든요.
  오늘 출근하셨는데 담배만 스무대 피시고 표정이 안좋아보이세요
  어떻게 해야 될까요? 웃겨드릴려고 별짓을 다 해봤는데 효과가 없어요
  가만히 있을까요? 우울해요
  으
  아
  아
  아
  아
  아
  아`,
};

export default function WritePage(): JSX.Element {
  const [selected, setSelected] = useSelector(dummy.items, '자유');
  const [title, setTitle] = useTextarea(dummy.title);
  const [content, setContent] = useTextarea(dummy.content);
  const handleClickImage = React.useCallback(() => {
    console.log(title);
  }, [title]);
  return (
    <Page>
      <Selector
        items={dummy.items}
        selected={selected}
        handleChange={setSelected}
      />
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
    </Page>
  );
}

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
