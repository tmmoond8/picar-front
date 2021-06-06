/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import { colors } from '../../styles';
import Icon from '../Icon';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import { useStore } from '../../stores';
import { useCommentContext, observer } from './context';

const CommentViewer: React.FC<{ className?: string; showCount: boolean }> = ({ className, showCount }) => {
  const { ui } = useStore();
  const { comments, articleAuthorCode } = useCommentContext();
  return (
    <StyledComments className={cx('Comments', className)}>
      {showCount && <CommentHeader>댓글 {comments.length}</CommentHeader>}
      <CommentEditor />
      <CommentList className="CommentList">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            articleAuthorCode={articleAuthorCode}
            commentAuthorCode={comment.author.code}
            name={comment.author.name}
            group={comment.author.group}
            createAt={comment.createAt}
            content={comment.content}
            thumbnail={comment.author.thumbnail}
            isDelete={comment.isDelete}
          >
            <ReplyList className="ReplyList">
              {comment.replies &&
                comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    id={reply.id}
                    articleAuthorCode={articleAuthorCode}
                    commentAuthorCode={reply.author.code}
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
          <Empty className="Empty">
            <Icon icon="chat" size="39px" />
            <h3>첫 댓글을 남겨주세요.</h3>
          </Empty>
        )}
      </CommentList>
    </StyledComments>
  );
};

export default observer(CommentViewer);

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentList = styled.ul`
  min-height: 240px;
  overflow: hidden;
  padding: 0 0 73px;
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

const CommentHeader = styled.div`
  height: 56px;
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${colors.black22};
`;