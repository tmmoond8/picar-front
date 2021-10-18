/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { throttle } from 'throttle-debounce';
import cx from 'classnames';

import { NewsFeed } from '../../types/News';
import Profile from '../Profile';
import { colors } from '../../styles';
import { getDateGoodLook } from '../../modules/string';

const newLogs = {
  'Herald News':
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622726879/noticon/jtbkem1oqk1ro1yrpuls.png',
  HyundaiMotorGroup:
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622726833/noticon/dlq88x31qrnbd5c3wtkp.png',
  NewsWire:
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622726900/noticon/exjodth7nm0ffv8q1zvo.png',
  'ET News':
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622726863/noticon/kakndsc5wpxxlopsw0f8.png',
} as const;

const NewsList: React.FC<{
  className?: string;
  news: NewsFeed[];
}> = ({ className, news: allNews }) => {
  const { news, loadMore, isEnd } = usePaging(allNews);

  const handleScroll = throttle(
    8,
    true,
    (e: React.UIEvent<HTMLOListElement>) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target as HTMLOListElement;
      if (!isEnd && clientHeight + scrollTop + 60 > scrollHeight) {
        loadMore();
      }
    },
  );

  return (
    <List className={cx('NewsList', className)} onScroll={handleScroll}>
      {news.map((feed) => (
        <Card key={feed.id} onClick={() => window.open(feed.link)}>
          <CardHead>
            <PublisherLogo
              src={newLogs[feed.publisher as keyof typeof newLogs]}
              size={24}
            />
            <Profile.WhoDot name={feed.publisher} />
            <p className="feed-time">{getDateGoodLook(feed.pubDate)}</p>
          </CardHead>
          <CardBody>
            <div className="NewsCardContentWrapper">
              <p className="NewsCardTitle">{feed.title}</p>
              <p className="NewsCardContent">{feed.content}</p>
            </div>
            <Thumbnail src={feed.thumbnail} />
          </CardBody>
        </Card>
      ))}
    </List>
  );
};

export default React.memo(NewsList);

const List = styled.ol`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  li {
    margin-top: 8px;
  }
`;

const Card = styled.li`
  padding: 16px 18px;
  background-color: ${colors.white};
  overflow: hidden;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  .feed-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    font-weight: 400;
    color: ${colors.blackAA};
  }
`;

const CardBody = styled.div`
  display: flex;
  padding: 16px 0;
  cursor: pointer;

  .NewsCardContentWrapper {
    flex: 1;
    width: 100%;
    word-break: break-all;
  }

  .NewsCardTitle {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .NewsCardContent {
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.black99};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 2px;
  object-fit: cover;
  object-position: top;
  margin-left: 16px;
`;

const PublisherLogo = styled(Profile.Photo)`
  margin: 0 8px 0 0;
`;

function usePaging(initNews: NewsFeed[]) {
  const SIZE = 12;
  const [page, setPage] = React.useState(1);
  const [isEnd, setIsEnd] = React.useState(false);
  const [allNews, setAllNews] = React.useState(initNews);

  React.useEffect(() => {
    setAllNews(initNews);
  }, [initNews]);

  const news = React.useMemo(() => {
    return allNews.slice(0, page * SIZE);
  }, [allNews, page]);

  const loadMore = () => {
    if (initNews.length === news.length) {
      setIsEnd(true);
    } else {
      setPage(page + 1);
    }
  };

  return {
    news,
    loadMore,
    isEnd,
  };
}
