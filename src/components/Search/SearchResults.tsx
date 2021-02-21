/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import UserList from './UserList';
import ArticleList from '../ArticleList';
import Carousel from '../Carousel';
import { Tabs, TabItem } from '../Tabs';

import { colors } from '../../styles';
import APIS from '../../apis';
import { CAROUSEL } from '../../types/constants';
import Article from '../../types/Article';
import { Profile } from '../../types/User';
import { useStore, observer} from '../../stores';

const tabs = [ 
  { id: 'article', display: '게시글' }, 
  { id: 'nickname', display: '닉네임' }, 
];

const SearchResults: React.FC<{search: string}> = ({search}) => {
  const { user } = useStore();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [ articles, setArticles] = React.useState<Article[]>([]);
  const [ users, setUsers] = React.useState<Profile[]>([]);
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.SEARCH](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const articlePomise = APIS.article.search(search);
      const userPomise = APIS.user.search(search);
      const { data: articleData } = await articlePomise
      const { data: userData } = await userPomise
      if (articleData.ok) {
        setArticles(articleData.articles)
      }
      if (userData.ok) {
        setUsers(userData.users)
      }
    }, 1000)
    return () => clearTimeout(timer);
  }, [search])

  return (
    <Wrapper>
      <SearchResultsTab>
        {tabs.map((tab, index) => (
          <TabItem key={tab.id} handleClick={() => handleClickTab(tab)} selected={index === tabIndex}>
            {tab.display}
          </TabItem>)
        )}
      </SearchResultsTab>
      <Carousel
        id={CAROUSEL.SEARCH}
        index={tabIndex}
        onChangeIndex={setTabIndex}
      >
        <ArticleList
          articles={articles}
          bookmarks={user.bookmarks}
        />
        <UserList users={users}/>
      </Carousel>
    </Wrapper>
  )
}

export default observer(SearchResults);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colors.white};
  overflow-y: hidden;

  .ArticleList {
    li + li {
      margin-top: 1px;
      box-shadow: 0 -1px ${colors.blackF5F6F7};
    }
  }

  .carousel-container {
    flex: 1;
    overflow-y: hidden;
  }
`;

const SearchResultsTab = styled(Tabs)`
  background-color: ${colors.white};
`;