/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Comment from './Comment';
import CommentEditor from './CommentEditor';

import { useFectch } from './hooks';

interface CommentAreaProps {
  articleId: number;
}

export default function CommentArea(props: CommentAreaProps): JSX.Element {
  const { articleId } = props;
  const comments = useFectch(articleId);
  console.log(comments);

  return (
    <Area>
      <CommentList>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            authorId={comment.author.id}
            name={comment.author.name}
            group={comment.author.group}
            createAt={comment.createAt}
            content={comment.content}
          >
            <ReplyList>
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  authorId={reply.author.id}
                  name={reply.author.name}
                  group={reply.author.group}
                  createAt={reply.createAt}
                  content={reply.content}
                />
              ))}
            </ReplyList>
          </Comment>
        ))}
      </CommentList>
      <CommentEditor />
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

const CommentList = styled.ol``;

const ReplyList = styled.ol`
  margin-top: 20px;
`;
