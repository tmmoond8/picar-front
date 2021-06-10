/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import APIS from '../../apis';
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

const UserActivations: React.FC<{
  userCode: string;
  tab: string;
  className?: string;
  onChange?: (index: number) => void;
}> = ({ userCode, tab, className, onChange }) => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [bookmarks, setBookmarks] = React.useState<Article[]>([]);
  const { user } = useStore();
  const [tabIndex, setTabIndex] = React.useState(tabs.findIndex(({ id }) => id === tab));
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.PROFILE](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  const handleOnChange = React.useCallback((index) => {
    setTabIndex(index);
    if (typeof onChange === 'function') {
      onChange(index);
    }
  }, [setTabIndex])

  React.useEffect(() => {
    (async () => {
      const articlePromise = APIS.article.getUserArticles(userCode);
      const commentPromise = APIS.comment.getUserComments(userCode);
      const bookmarkPromise = APIS.article.listBookmark((Array.from(user.bookmarks)));
      const { data: articleData } = await articlePromise;
      if (articleData.ok) {
        setArticles(articleData.articles);
      }
      const { data: commentData } = await commentPromise;
      if (commentData.ok) {
        setComments(commentData.userComments);
      }
      const { data: bookmarkData } = await bookmarkPromise;
      if (commentData.ok) {
        setBookmarks(bookmarkData.articles);
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
          <CommentList comments={comments} />
          <ArticleList
            articles={bookmarks}
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
`;

const StyledCarousel = styled(Carousel)`
  flex: 1;

  .UserProfilePhoto {
    pointer-events: none;
  }
`;