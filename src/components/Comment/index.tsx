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
        />
        <Comment
          authorId="ajsshdhdud"
          name="두올아이"
          group="요식업"
          createAt="2020.09.24"
          content="권리금 알려주세요.. 그리고 본사홈페이지를 찾을 수 없는데 혹시 주소가 바뀌었나요?"
        >
          <ReplyList>
            <Comment
              authorId="dhsd9ds9hd"
              name="인천아사"
              group="요식업"
              createAt="2020.09.24"
              content="아뇨 주소는 그대로입니다."
            />
            <Comment
              authorId="dis8s"
              name="예비사장"
              group="요식업"
              createAt="2020.09.24"
              content="저도 부탁드립니다."
            />
          </ReplyList>
        </Comment>

        <Comment
          authorId="dhd88d"
          name="서울맘마뭄"
          group="요식업"
          createAt="2020.09.24"
          content="권리금 쪽지 부탁드립니다."
        />
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

const ReplyList = styled.ol`
  margin-top: 20px;
`;
