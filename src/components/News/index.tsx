/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { NewsFeed } from '../../types/News';
import Profile from '../Profile';
import { colors } from '../../styles';
import { getDateGoodLook } from '../../modules/string';

const newLogs = {
  'Herald News': 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622478402/noticon/rxsm1xn9galey5ic6mcy.png',
  'HyundaiMotorGroup': 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622478573/noticon/jxbxgoljfpkz2rwt9knc.png',
  'NewsWire': 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622478607/noticon/ywdda0kpuhk1nnxzg8ju.png',
  'ET News': 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622478884/noticon/i7bne3kuq9df4er4jz9i.png',
} as const;

const NewsList: React.FC<{
  className?: string;
  news: NewsFeed[];
}> = ({
  className, news,
}) => {

    return (
      <List className={cx("NewsList", className)}>
        {news.map((feed) => (
          <Card
            key={feed.id}
            onClick={() => window.open(feed.link)}
          >
            <CardHead>
              <PublisherLogo
                src={newLogs[feed.publisher as keyof typeof newLogs]}
                size={24}
              />
              <Profile.WhoDot name={feed.publisher} />
              <p className="feed-time">{getDateGoodLook(feed.pubDate)}</p>
            </CardHead>
            <CardBody >
              <div className="NewsCardContentWrapper">
                <p className="NewsCardTitle">{feed.title}</p>
                <p className="NewsCardContent">{feed.content}</p>
              </div>
              <Thumbnail src={feed.thumbnail} />
            </CardBody>
          </Card>
        ))
        }
      </List >
    );
  }

export default React.memo(NewsList);

const List = styled.ol`
  width: 100%;
  height: calc(100% - 60px);
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