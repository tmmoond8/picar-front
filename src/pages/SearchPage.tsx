/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import SearchComponents from '../components/Search';
import Input from '../components/Input';
import Content from '../components/Content';
import APIS from '../apis';

const SearchPage: React.FC = () => {
  const [ search, setSearch ] = React.useState('');
  const [ recommendations, setrecommendations] = React.useState([]);
  const [ isOnSearch, setIsOnSearch ] = React.useState(false);
  const handleClickRecommendation = React.useCallback((keyword: string) => {
    setSearch(keyword);
  }, [])

  React.useEffect(() => {
    if (recommendations.length === 0) {
      (async () => {
        const { data: {
          data
        } } = await APIS.spreadSheet.get();
        setrecommendations(data);
      })();
    }
  }, [recommendations])

  return (
    <SearchComponents.Page>
      <SearchComponents.Input 
        search={search} 
        onChangeSearch={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(e.target.value)} 
        onClear={() => setSearch('')} 
        isOnSearch={isOnSearch}
        setIsOnSearch={setIsOnSearch}
      />
      {isOnSearch && !search && (
        <React.Fragment>
          <SearchComponents.Title>검색어 추천</SearchComponents.Title>
          <SearchComponents.Recommendations recommendations={recommendations} handleClickRecommendation={handleClickRecommendation}/>
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
          <SearchComponents.SearchResults search={search}/>
        </React.Fragment>
      )}
    </SearchComponents.Page>
  )
}
export default SearchPage;