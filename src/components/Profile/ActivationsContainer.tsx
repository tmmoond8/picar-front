/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import Profile from './Profile';
import APIS from '../../apis';
import { colors } from '../../styles';
import ArticleList from '../ArticleList';
import CommentList from '../ProfileCommentList';
import Article from '../../types/Article';
import Comment from '../../types/Comment';
import Carousel from '../Carousel';
import { Tabs, TabItem } from '../Tabs';
import { CAROUSEL } from '../../types/constants';
import { useStore, observer } from '../../stores';

const tabs = [ 
  { id: 'article', display: '게시글' }, 
  { id: 'comment', display: '댓글' },
  { id: 'bookmark', display: '북마크' },
];

const UserActivations: React.FC<{ userCode: string; tab: string; className?: string}> = ({ userCode, tab, className }) => {
  const [ articles, setArticles] = React.useState<Article[]>([]);
  const [ comments, setComments] = React.useState<Comment[]>([]);
  const { user } = useStore();
  const [tabIndex, setTabIndex] = React.useState(tabs.findIndex(({id}) => id === tab));
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.PROFILE](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  const setCarouselHeight = React.useCallback((index) => {
    const cameraElement = document.querySelector(`#${CAROUSEL.PROFILE} .eg-flick-camera`);
    if (cameraElement) {
      if (cameraElement && cameraElement.childNodes && cameraElement.childNodes.length > index) {
        const childHeight = (cameraElement.childNodes[index] as any).scrollHeight;
        (document.getElementById(CAROUSEL.PROFILE) as any).style.height = `${childHeight}px`;
      }
    }
  }, [])

  const handleOnChange = React.useCallback((index) => {
    setTabIndex(index);
    // setCarouselHeight(index);
  }, [setCarouselHeight, setTabIndex])

  React.useEffect(() => {
    // setCarouselHeight(tabIndex);
  }, [articles, comments])

  React.useEffect(() => {
    (async () => {
      const articlePromise = APIS.article.getUserArticles(userCode);
      const commentPromise = APIS.comment.getUserComments(userCode);
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

  const bookmarkedArticles = React.useMemo(() => articles.filter((article) => user.bookmarks.has(article.id)), [articles])

  return (
    <React.Fragment>
      {articles && comments && <Container className={cx('ActivationsContainer', className)}>
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
          onChangeIndex={handleOnChange}
        >
          <ArticleList
            articles={articles}
            bookmarks={user.bookmarks}
          />
          <CommentList comments={comments}/>
          <ArticleList
            articles={bookmarkedArticles}
            bookmarks={user.bookmarks}
          />
        </StyledCarousel>
      </Container>}
    </React.Fragment>
  )
}

export default observer(UserActivations);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: ${colors.white};
`;

const StyledCarousel = styled(Carousel)`
  flex: 1;

  .UserProfilePhoto {
    pointer-events: none;
  }
`;