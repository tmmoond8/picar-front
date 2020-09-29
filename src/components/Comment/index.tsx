/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Comment from './Comment';

interface CommentAreaProps {}

export default function CommentArea(props: CommentAreaProps): JSX.Element {
  return (
    <Area>
      <h3>이전 댓글 더 보기</h3>
      <ol>
        <Comment
          authorId="dskfjldfdsf"
          name="아아어어"
          group="요식업"
          createAt="2020.09.24"
          content="저 오늘까지만 하겠습니다"
        ></Comment>
      </ol>
    </Area>
  );
}

const Area = styled.div`
  padding: 0 19px;
  h3 {
    height: 59px;
    font-size: 14px;
    font-weight: 500;
    line-height: 59px;
    letter-spacing: -0.25px;
    color: #3e4045;
  }
`;
