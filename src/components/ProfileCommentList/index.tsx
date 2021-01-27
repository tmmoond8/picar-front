/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Comment from '../../types/Comment';
import { colors } from '../../styles';
import { getDateGoodLook } from '../../modules/string';
import Icon from '../Icon';

const ProfileCommentList: React.FC<{ comments: Comment[]}> = ({ comments }) => {

  return (
    <List>
      {comments.map((comment) => (
        <Item className="Comment">
          <h2 className="CommentContent">{comment.content}</h2>
          <h3 className="ArticleTitle"><Icon icon="articleNew" size="16px"/>{comment.article!.title}</h3>
          <div className="CommentFooter">
            <span>{getDateGoodLook(comment.createAt)}</span>
            {!!comment.replies!.length && <span>답글 {comment.replies!.length}</span>}
            <span>{comment.article!.group}</span>
          </div>
        </Item>
      ))}
    </List>
  )
}

export default ProfileCommentList;

const List = styled.ol`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

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

  .CommentContent {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.38;
    color: ${colors.black33};
  }

  .ArticleTitle {
    display: flex;
    align-items: center;
    margin: 10px 0 0 0;
    font-size: 14px;
    line-height: 1.14;
    color: ${colors.black99};
    letter-spacing: -0.25px;

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