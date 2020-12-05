/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import Icon from '../Icon';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import { useCommentContext, observer } from './context';

const CommentViewer = () => {
  const { comments, articleAuthorCode } = useCommentContext();
  return (
    <StyledComments>
      <CommentList>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            articleAuthorCode={articleAuthorCode}
            name={comment.author.name}
            group={comment.author.group}
            createAt={comment.createAt}
            content={comment.content}
            thumbnail={comment.author.thumbnail}
            isDelete={comment.isDelete}
          >
            <ReplyList>
              {comment.replies &&
                comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    id={reply.id}
                    articleAuthorCode={articleAuthorCode}
                    name={reply.author.name}
                    group={reply.author.group}
                    createAt={reply.createAt}
                    content={reply.content}
                    thumbnail={reply.author.thumbnail}
                    isDelete={reply.isDelete}
                  />
                ))}
            </ReplyList>
          </Comment>
        ))}
        {comments.length === 0 && (
          <Empty>
            <Icon icon="chat" size="39px" />
            <h3>첫 댓글을 남겨주세요.</h3>
          </Empty>
        )}
      </CommentList>
      <CommentEditor />
    </StyledComments>
  );
};

export default observer(CommentViewer);

const StyledComments = styled.div`
  padding: 0 0 92px;
`;

const CommentList = styled.ol`
  min-height: 240px;
  overflow: hidden;
  label: CommentList;
`;

const ReplyList = styled.ol`
  padding: 0 0 0 44px;
  & > li {
    background-color: white;
    box-shadow: -100px 0 white, 150px 0 white, 250px 0 white, 350px 0 white,
      450px 0 white, 550px 0 white, 650px 0 white, 750px 0 white, 850px 0 white,
      950px 0 white, 1050px 0 white, 950px 0 white, 1250px 0 white,
      1150px 0 white, 1450px 0 white, 1350px 0 white, 1650px 0 white,
      1550px 0 white;
  }
  label: ReplyList;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;

  h3 {
    margin-top: 13px;
    font-size: 15px;
    font-weight: normal;
    line-height: normal;
    color: ${colors.blackBF};
  }
`;
