/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../styles';
import { useTextInput } from '../hooks';
import Selector, { useSelector } from '../components/Selector';
import HR from '../components/HR';

const items = ['자유', '유머', '정부지원', '요식업'];

export default function WritePage(): JSX.Element {
  const [selected, setSelected] = useSelector(items, '자유');
  const [title, setTitle] = useTextInput('');
  return (
    <Page>
      <Selector items={items} selected={selected} handleChange={setSelected} />
      <Title
        value={title}
        onChange={setTitle}
        placeholder="제목을 입력하세요."
      />
      <HR marginTop={30} />
    </Page>
  );
}

const Page = styled.section`
  padding: 24px 18px 34px;
`;

const Title = styled.input`
  display: block;
  margin-top: 30px;
  outline: none;
  border: none;
  color: ${colors.black100};
  font-size: 17px;
  line-height: 24px;
`;

const Content = styled.textarea`
  position: relative;
  flex: 1;
  height: 64px;
  margin: 0 16px;

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
