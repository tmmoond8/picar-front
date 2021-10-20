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
import { usePaging, usePullDownRefresh } from './hooks';

const ArticleList: React.FC<{
  className?: string;
  articles: Article[];
  bookmarks: Set<number>;
  name: string;
  emptyString?: string;
}> = ({ articles: initArticles, bookmarks, className, emptyString, name }) => {
  const { user, article: articleStore } = useStore();
  const { articles, loadMore, isEnd } = usePaging(initArticles, name);
  const [onRefresh, setOnRefresh] = React.useState(false);
  const listRef = React.useRef<HTMLOListElement>(null);
  const loaderContainerRef = React.useRef<HTMLDivElement>(null);
  const loaderRef = React.useRef<SVGSVGElement>(null);
  const pullDownHandler = usePullDownRefresh(listRef);
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

  const clear = () => {
    if (loaderRef.current) {
      loaderRef.current.style.transform = 'scale(1)';
      loaderRef.current.style.transition = 'all 0.1s ease-out';
      loaderRef.current.style.opacity = '1';
    }
    loaderContainerRef.current!.style.top = '-60px';
  };

  React.useEffect(() => {
    setOnRefresh(false);
    clear();
  }, [articles]);

  React.useEffect(() => {
    if (onRefresh) {
      if (loaderRef.current) {
        loaderRef.current.style.transition = 'all 0.3s ease-out';
        loaderRef.current.style.transform = 'scale(3)';
        loaderRef.current.style.opacity = '0';
      }
    } else {
    }
  }, [onRefresh]);

  const WEIGHT = 2;

  return (
    <StyledArticleList
      ref={listRef}
      data-id={name}
      className={cx('ArticleList', className)}
      onScroll={handleScroll}
      onTouchStart={pullDownHandler.onTouchStart}
      onTouchMove={(e) => {
        pullDownHandler.onTouchMove(e);
        const progress = pullDownHandler.pullRef.current;
        if (
          loaderRef.current &&
          pullDownHandler.pullRef.current &&
          loaderContainerRef.current
        ) {
          loaderRef.current!.style.transform = `rotate(${-Math.min(
            pullDownHandler.pullRef.current * 3,
            900,
          )}deg)`;

          loaderContainerRef.current!.style.top = onRefresh
            ? '20px'
            : `${Math.min(progress / 2 - 60, 20)}px`;
        }
      }}
      onTouchEnd={(e) => {
        pullDownHandler.onTouchEnd(e);
        if (loaderRef.current && pullDownHandler.pullRef.current) {
          if (pullDownHandler.pullRef.current > 156 * WEIGHT) {
            articleStore.fetchList();
            setOnRefresh(true);
          } else {
            clear();
          }
        }
      }}
    >
      <CircularProgressbar ref={loaderContainerRef} onRefresh={onRefresh}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ref={loaderRef}
          fill={colors.primary}
        >
          <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
        </svg>
      </CircularProgressbar>
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
  position: relative;
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

const CircularProgressbar = styled.div<{ onRefresh: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  top: -60px;

  svg {
    width: 44px;
    height: 44px;
    background-color: ${colors.white};
    border-radius: 50%;
  }
`;
