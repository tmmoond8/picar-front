/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Profile from './Profile';
import APIS from '../../apis';
import ArticleList from '../ArticleList';
import CommentList from '../ProfileCommentList';
import Article from '../../types/Article';
import Comment from '../../types/Comment';
import { Profile as ProfileType } from '../../types/User';
import Carousel from '../Carousel';
import { Tabs, TabItem } from '../Tabs';
import { CAROUSEL } from '../../types/constants';
import { useStore, observer } from '../../stores';
import { colors } from '../../styles';

const tabs = [
  { id: 'article', display: '게시글' },
  { id: 'comment', display: '댓글' },
];

const ProfileContainer: React.FC<{ userCode: string }> = ({ userCode = "phupdv3yb" }) => {
  const [targetUser, setTargetUser] = React.useState<any | null>(null);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const { user } = useStore();
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.PROFILE](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  React.useEffect(() => {
    (async () => {
      const userPromise = APIS.user.get(userCode);
      const articlePromise = APIS.article.getUserArticles(userCode);
      const commentPromise = APIS.comment.getUserComments(userCode);
      const { data: userData } = await userPromise;
      if (userData.ok) {
        setTargetUser(userData.user);
      }
      const { data: articleData } = await articlePromise;
      if (articleData.ok) {
        setArticles(articleData.articles);
      }
      const { data: commentData } = await commentPromise;
      if (commentData.ok) {
        setComments(commentData.userComments);
      }
    })();
  }, [userCode])


  return (
    <React.Fragment>
      {targetUser && (
        <Container>
          <StyledProfile {...targetUser} />
          <Tabs>
            {tabs.map((tab, index) => (
              <TabItem key={tab.id} handleClick={() => handleClickTab(tab)} selected={index === tabIndex}>
                {tab.display}
              </TabItem>)
            )}
          </Tabs>
          <StyledCarousel
            id={CAROUSEL.PROFILE}
            index={tabIndex}
            onChangeIndex={setTabIndex}
          >
            <ArticleList
              articles={articles}
              bookmarks={user.bookmarks}
            />
            <CommentList comments={comments} />
          </StyledCarousel>
        </Container>
      )}
    </React.Fragment>
  )
}

export default observer(ProfileContainer);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.blackF5F6F7};
`;

const StyledProfile = styled(Profile)`
  height: fit-content;
  padding: 14px 18px;
  background-color: ${colors.white};
`;

const StyledCarousel = styled(Carousel)`
  flex: 1;

  .UserProfilePhoto {
    pointer-events: none;
  }
`;