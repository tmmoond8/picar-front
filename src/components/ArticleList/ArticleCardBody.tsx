/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';

interface ArticleCardBodyProps {
  handleClickArticle: () => void;
  title: string;
  content: string;
  photos: string | null;
}

const ArticleCardBody: React.FC<ArticleCardBodyProps> = ({
  handleClickArticle,
  title,
  content,
  photos,
}) => {
  return (
    <Body onClick={handleClickArticle}>
      <div className="ArticleContentWrapper">
        <p className="ArticleTitle">{title}</p>
        <p className="ArticleContent">{content}</p>
      </div>
      {photos && <Thumbnail src={photos} />}
    </Body>
  );
};

export default React.memo(ArticleCardBody);

const Body = styled.div`
  display: flex;
  padding: 16px 0;
  cursor: pointer;

  .ArticleContentWrapper {
    flex: 1;
    width: 100%;
    word-break: break-all;
  }

  .ArticleTitle {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ArticleContent {
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
