/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { throttle } from 'throttle-debounce';
import { toast } from 'react-toastify';
import sessionStorage from '../../modules/sessionStorage';
import Icon from '../Icon';
import Article from '../../types/Article';
import { EmotionType } from '../../types/Emotion';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import { useOpenArticleEditor } from '../Article';

const ArticleList: React.FC<{
  className?: string;
  articles: Article[];
  bookmarks: Set<number>;
  name: string;
  emptyString?: string;
}> = ({ articles: initArticles, bookmarks, className, emptyString, name }) => {
  const { user } = useStore();
  const { articles, loadMore, isEnd } = usePaging(initArticles, name);
  const listRef = React.useRef<HTMLOListElement>(null);
  const openArticleEditor = useOpenArticleEditor();
  React.useEffect(() => {
    if (listRef.current && sessionStorage.getScroll(name)) {
      listRef.current.scrollTop = sessionStorage.getScroll(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickBookmark = React.useCallback(
    (articleId: number) => () => {
      if (user.needLogin()) {
        return;
      }
      if (bookmarks.has(articleId)) {
        toast('북마크에서 제거했습니다.');
        user.removeBookmark(articleId);
      } else {
        toast('북마크에 추가했습니다.');
        user.addBookmark(articleId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [bookmarks, user],
  );
  const handleEmotionUpdate =
    (articleId: number) => (emotionType: EmotionType) => {
      user.setEmotion(articleId, emotionType);
    };

  const handleClickWrite = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);

  const handleScroll = throttle(
    8,
    true,
    (e: React.MouseEvent<HTMLOListElement>) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target as HTMLOListElement;
      sessionStorage.setScroll(name, scrollTop);
      if (!isEnd && clientHeight + scrollTop + 40 > scrollHeight) {
        loadMore();
      }
    },
  );

  return (
    <StyledArticleList
      ref={listRef}
      data-id={name}
      className={cx('ArticleList', className)}
      onScroll={handleScroll}
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          handleClickBookmark={handleClickBookmark(article.id)}
          handleEmotionUpdate={handleEmotionUpdate(article.id)}
          hasBookmark={bookmarks.has(article.id)}
          hasComment={article.id in user.comments}
          myEmotion={user.emotions[article.id]}
        />
      ))}
      {emptyString && articles.length === 0 && (
        <Empty>
          {emptyString.includes('첫 글을') && (
            <Icon icon="cross" size="56px" onClick={handleClickWrite} />
          )}
          {emptyString}
        </Empty>
      )}
    </StyledArticleList>
  );
};

export default observer(ArticleList);

const StyledArticleList = styled.ol`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  li {
    margin-top: 8px;
  }
`;

const Empty = styled.li`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
    font-size: 17px;
    line-height: 1.18;
    color: ${colors.black99};

    .Icon.cross {
      margin-bottom: 24px;
    }

    .Icon.cross {
      cursor: pointer;
    }
  }
`;

function usePaging(initArticles: Article[], group: string) {
  const SIZE = 12;
  const [page, setPage] = React.useState(sessionStorage.getPage(group));
  const [isEnd, setIsEnd] = React.useState(false);
  const [allArtciles, setAllArticles] = React.useState(initArticles);

  React.useEffect(() => {
    setAllArticles(initArticles);
  }, [initArticles]);

  const articles = React.useMemo(() => {
    return allArtciles.slice(0, page * SIZE);
  }, [allArtciles, page]);

  const loadMore = () => {
    if (initArticles.length === articles.length) {
      setIsEnd(true);
    } else {
      setPage(page + 1);
      sessionStorage.setPage(group, page + 1);
    }
  };

  return {
    articles,
    loadMore,
    isEnd,
  };
}
