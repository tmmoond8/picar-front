/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import React from 'react';

const article = 7;

const PreRenderingPage: React.FC = () => {
  return (
    <ol>
      {new Array(article).fill(null).map((_, index) => (
        <Link to={`/article/${index + 1}`}>{`/article/${index + 1}`}</Link>
      ))}
      <Link to="/notice">/notice</Link>
      <Link to="/qna">/qna</Link>
      <Link to="/search">/search</Link>
    </ol>
  )
}

export default PreRenderingPage;