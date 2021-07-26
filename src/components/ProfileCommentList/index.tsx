/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Comment from '../../types/Comment';
import { colors } from '../../styles';
import { getDateGoodLook } from '../../modules/string';
import Icon from '../Icon';
import Center from '../Center';

const ProfileCommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const { util } = useStore();

  const handleClickArticle = React.useCallback((id: number) => {
    util.history.push(`/article/${id}`);
  }, [util.history]);

  return (
    <List>
      {comments.map((comment) => (
        <Item key={comment.id} className="Comment" onClick={() => handleClickArticle(comment.articleId)}>
          <h2 className="CommentContent">{comment.content}</h2>
          <h3 className="ArticleTitle"><Icon icon="articleNew" size="16px" />{comment.article!.title}</h3>
          <div className="CommentFooter">
            <span>{getDateGoodLook(comment.createAt)}</span>
            {!!comment.replies!.length && <span>답글 {comment.replies!.length}</span>}
            <span>{comment.article!.group}</span>
          </div>
        </Item>
      ))}
      {comments.length === 0 && <EmptyText >작성하신 댓글이 없습니다.</EmptyText>}
    </List>
  )
}

export default observer(ProfileCommentList);

const List = styled.ol`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .Comment {
    margin-top: 8px;
    box-shadow: 0 -8px ${colors.blackF5F6F7};
  }
`;

const Item = styled.li`
  height: 112px;
  padding: 15px 18px;
  background-color: ${colors.white};
  box-sizing: content-box;
  cursor: pointer;

  .CommentContent {
    line-height: 1.38;
    font-size: 16px;
    font-weight: 500;
    word-break: break-all;
    color: ${colors.black33};
  }

  .ArticleTitle {
    display: flex;
    align-items: center;
    line-height: 1.14;
    margin: 10px 0 0 0;
    font-size: 14px;
    color: ${colors.black99};
    letter-spacing: -0.25px;
    word-break: break-all;

    .Icon.articleNew {
      display: inline-block;
      margin: 0 5px 0 0;
    }
  }

  .CommentFooter {
    margin: 14px 0 0 0;
    font-size: 12px;
    line-height: 1.67;
    color: ${colors.black99};

    span + span {
      position: relative;
      margin: 0 0 0 14px;
    }
    span + span:before {
      position: absolute;
      content: '·';
      left: -10px;
      top: 0;
      font-weight: 500;
    }
  }
`;

const EmptyText = styled(Center)`
  color: ${colors.black99};
`;