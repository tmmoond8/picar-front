/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
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
  const loaderRef = React.useRef<SVGCircleElement>(null);
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
    loaderRef.current!.style.strokeDasharray = '1 360';
    loaderRef.current!.style.transform = 'rotate(0deg)';
    loaderContainerRef.current!.style.top = '-60px';
    const svgEl = loaderContainerRef.current!.querySelector('svg');
    svgEl!.style.backgroundImage = 'none';
  };

  React.useEffect(() => {
    setOnRefresh(false);
    clear();
  }, [articles]);

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
        const progress =
          120 * Math.log2(pullDownHandler.pullRef.current / (32 * WEIGHT));
        if (
          loaderRef.current &&
          pullDownHandler.pullRef.current &&
          loaderContainerRef.current
        ) {
          loaderRef.current!.style.strokeDasharray = `${progress} 360`;
          loaderRef.current!.style.transform = `rotate(${pullDownHandler.pullRef.current}deg)`;
          loaderContainerRef.current!.style.top = `${Math.min(
            progress / 2 - 60,
            20,
          )}px`;
          const svgEl = loaderContainerRef.current!.querySelector('svg');
          if (pullDownHandler.pullRef.current > 156 * WEIGHT) {
            svgEl!.style.backgroundImage =
              "url('https://www.picar.kr/logo192.png')";
          } else {
            svgEl!.style.backgroundImage = 'none';
          }
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
          className="svg-container"
          height="100"
          width="100"
          viewBox="0 0 100 100"
        >
          <circle
            className="loader-svg"
            cx="50"
            cy="50"
            r="45"
            ref={loaderRef}
          ></circle>
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

const spin = keyframes`
  100% {
    transform: rotate(360deg);
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
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;

    ${(p) =>
      p.onRefresh &&
      css`
        animation: ${spin} 1s infinite linear;
      `}

    .loader-svg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      fill: none;
      stroke-width: 8px;
      stroke-linecap: round;
      stroke: ${colors.primary};
      stroke-dasharray: 1 360;
      stroke-dashoffset: 0;
      transform-origin: center;
    }
  }
`;
