/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { NewsFeed } from '../../types/News';
import Profile from '../Profile';
import { colors } from '../../styles';
import { getDateGoodLook } from '../../modules/string';

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
              <Profile.Photo
                src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1594648084/noticon/qfg5idw99fyq2b4ry6wn.png"
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