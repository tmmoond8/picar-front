/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

const PopularArticles: React.FC<{}> = () => {
  return (
    <StyledPopularArticles className="PopularArticles">
      PopularArticles
    </StyledPopularArticles>
  );
};

export default PopularArticles;

const StyledPopularArticles = styled.div`
  width: 300px;
  height: 307px;
  background-color: skyblue;
`;
