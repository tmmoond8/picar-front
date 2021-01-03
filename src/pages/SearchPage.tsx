/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../styles';
import SearchComponents from '../components/Search';
import MenuBar from '../components/MenuBar';
import Input from '../components/Input';

const SearchPage: React.FC = () => {
  const [ search, onChangeSearch ] = Input.useTextField('')

  return (
    <Page>
      <SearchComponents.Input search={search} onChangeSearch={onChangeSearch}/>
      <Title>인기 글</Title>
      <SearchComponents.PopArticles />
      <StyledMenuBar />
    </Page>
  )
}
export default SearchPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .PopularArticleList {
    flex: 1;
    overflow-y: scroll;
  }
`;

const Title = styled.h2`
  position: relative;
  padding: 6px 18px 0 18px;
  color: ${colors.black22};
  font-weight: bold;

  &:after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.1),  rgba(255, 255, 255, 0.9));
  }
`;

const StyledMenuBar = styled(MenuBar)`
  position: static;
  top: none;
  left: none;
  right: none;
  bottom: none;
`;