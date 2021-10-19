import React from 'react';
import { throttle } from 'throttle-debounce';
import Article from '../../types/Article';
import sessionStorage from '../../modules/sessionStorage';

export function usePaging(initArticles: Article[], group: string) {
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

export function usePullDownRefresh(listRef: React.RefObject<HTMLOListElement>) {
  const pullRef = React.useRef(0);
  const touchPointY: { start: number; current: number; end: number } = {
    start: 0,
    current: 0,
    end: 0,
  };

  const onTouchStart = throttle(
    8,
    false,
    (e: React.TouchEvent<HTMLOListElement>) => {
      if (!listRef.current) {
        console.log('not list');
        return;
      }
      touchPointY.start = 0;
      touchPointY.current = 0;
      touchPointY.end = 0;
      pullRef.current = 0;

      const touch = e.changedTouches && e.changedTouches[0];
      const { clientY } = touch;
      touchPointY.start = clientY + listRef.current.scrollTop;
    },
  );

  const onTouchMove = throttle(
    32,
    true,
    (e: React.TouchEvent<HTMLOListElement>) => {
      if (!listRef.current) {
        return;
      }

      const touch = e.changedTouches && e.changedTouches[0];
      const { clientY } = touch;
      touchPointY.current = clientY;
      pullRef.current = Math.max(
        touchPointY.current - touchPointY.start - listRef.current.scrollTop,
        0,
      );
    },
  );

  const onTouchEnd = throttle(
    8,
    false,
    (e: React.TouchEvent<HTMLOListElement>) => {
      const touch = e.changedTouches && e.changedTouches[0];
      const { clientY } = touch;
      touchPointY.end = clientY;
    },
  );

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    pullRef,
  };
}
