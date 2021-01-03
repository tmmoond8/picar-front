/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import SearchComponents from '../components/Search';
import Input from '../components/Input';
import Content from '../components/Content';


var recommandations = [
  '정부지원 보조금',
  '알바생',
  '일회용품',
  '무료 세무사',
  '무료 배달의 민족',
]

const SearchPage: React.FC = () => {
  const [ search, onChangeSearch, onClear ] = Input.useTextField('')
  const [ isOnSearch, setIsOnSearch ] = React.useState(true);

  return (
    <SearchComponents.Page>
      <SearchComponents.Input 
        search={search} 
        onChangeSearch={onChangeSearch} 
        onClear={onClear} 
        isOnSearch={isOnSearch}
        setIsOnSearch={setIsOnSearch}
      />
      {isOnSearch && !search && (
        <React.Fragment>
          <Content.SpaceBetween>
            <SearchComponents.Title>검색어 추천</SearchComponents.Title>
            <SearchComponents.RemoveRecentSearchs onClick={() => console.log('aaa')}>최근검색어 삭제</SearchComponents.RemoveRecentSearchs>
          </Content.SpaceBetween>
          <SearchComponents.Recommandations recommandations={recommandations}/>
        </React.Fragment>
      )}
      {!isOnSearch && (
        <React.Fragment>
          <SearchComponents.ShadowTitle>인기 글</SearchComponents.ShadowTitle>
          <SearchComponents.PopArticles />
          <SearchComponents.MenuBar />
        </React.Fragment>
      )}
      {isOnSearch && search && (
        <React.Fragment>
          <SearchComponents.SearchResults />
          <SearchComponents.MenuBar />
        </React.Fragment>
      )}
    </SearchComponents.Page>
  )
}
export default SearchPage;