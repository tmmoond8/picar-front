/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Article from '../../types/Article';
import ProfilePhoto from '../ProfilePhoto';
import { Profile } from '../../types/User';

import { colors } from '../../styles';

type ArticleCardProps = Article;

export default function ArticleCard(props: Article): JSX.Element {
  const { title, content, author, createAt } = props;
  const { thumbnail, name, group } = author as Profile;
  console.log(thumbnail);
  return (
    <Card>
      <Head>
        <ProfilePhoto src={thumbnail} />
        <p className="user-name">{name}</p>
        <p className="user-group">{group}</p>
        <p className="article-time">
          {new Date(createAt).toLocaleDateString()}
        </p>
      </Head>
      <Body>
        <p className="article-title">{title}</p>
        <p className="article-content">{content}</p>
      </Body>
    </Card>
  );
}

const Card = styled.article`
  padding: 16px 18px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  .user-name {
    margin-left: 11px;
    font-size: 13px;
    font-weight: 500;
    color: ${colors.black50};
  }
  .user-group {
    position: relative;
    margin-left: 10px;
    font-size: 13px;
    font-weight: 500;
    color: ${colors.black99};
    &::before {
      content: '·';
      position: absolute;
      width: 10px;
      height: 10px;
      left: -8px;
      top: 0px;
    }
  }
  .article-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    font-weight: 500;
    color: ${colors.black99};
  }
`;

const Body = styled.div`
  padding: 16px 0;

  .article-title {
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    color: ${colors.black100};
  }

  .article-content {
    margin-top: 8px;
    font-size: 14px;
    color: ${colors.black99};
  }
`;

const Bottom = styled.div`
  height: 32px;
`;
