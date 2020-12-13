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
      <div className="article-content-wrapper">
        <p className="article-title">{title}</p>
        <p className="article-content">{content}</p>
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

  .article-content-wrapper {
    flex: 1;
  }

  .article-title {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article-content {
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
  object-fit: contain;
  margin-left: 16px;
`;
