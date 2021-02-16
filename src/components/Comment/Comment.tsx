/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import Profile from '../Profile';
import Icon from '../Icon';
import { colors } from '../../styles';
import { useCommentContext, observer } from './context';
import { getDateGoodLook } from '../../modules/string';
import { useModal } from '../Modal';
import ProfileContainer from '../Profile/ProfileContainer';

interface CommentProps {
  id: string;
  articleAuthorCode: string;
  commentAuthorCode: string;
  thumbnail?: string;
  name: string;
  content: string;
  group?: string;
  createAt: string;
  children?: React.ReactNode;
  isDelete: boolean;
}

const Comment: React.FC<CommentProps> = (props) => {
  const {
    articleAuthorCode,
    commentAuthorCode,
    thumbnail,
    content,
    name,
    group,
    createAt,
    children,
    id,
    isDelete,
  } = props;
  const {
    handleClickReply,
    handleRemoveComment,
    about,
    userCode,
    editorRef,
  } = useCommentContext();
  const isFocus = React.useMemo(() => about === id, [about, id]);
  const isReply = React.useMemo(() => children === undefined, [children]);
  const isArticleAuthorsComment = React.useMemo(
    () => commentAuthorCode === articleAuthorCode,
    [articleAuthorCode, commentAuthorCode],
  );
  const isCommentAuthor = React.useMemo(() => userCode === commentAuthorCode, [
    commentAuthorCode,
    userCode,
  ]);
  const modal = useModal();

  const handleOpenProfile = React.useCallback(() => {
    modal.open({
      title: '',
      isFull: true,
      contents: (
        <ProfileContainer userCode={userCode}/>
      ),
    });
  }, [modal])

  return (
    <React.Fragment>
      <StyledComment isFocus={isFocus}>
        <ProfilePhoto src={thumbnail} onClick={handleOpenProfile}/>
        <ContentBox>
          <Profile.WhoDot
            name={name}
            group={group}
            nameColor={isArticleAuthorsComment ? colors.primary : undefined}
            right={
              isArticleAuthorsComment ? (
                <EditorBadge icon="editRound" size="16px" />
              ) : undefined
            }
          />
          <Content>{content}</Content>
          <span className="date">{getDateGoodLook(createAt)}</span>
          {!isReply && (
            <span
              className={cx('reply-btn')}
              onClick={() => {
                handleClickReply(id);
                if (editorRef.current && !isFocus) {
                  editorRef.current.focus();
                }
              }}
            >
              답글 달기
            </span>
          )}
          {isCommentAuthor && (
            <span
              className={cx('delete-btn')}
              onClick={() => {
                handleRemoveComment(id);
              }}
            >
              삭제
            </span>
          )}
        </ContentBox>
        {isDelete && (
          <DeletedComment>
            삭제된 {isReply ? '답' : '댓'}글입니다.
          </DeletedComment>
        )}
      </StyledComment>
      {children}
    </React.Fragment>
  );
};

export default observer(Comment);

const StyledComment = styled.li<{ isFocus: boolean }>`
  position: relative;
  display: flex;
  padding: 14px 19px 20px 19px;
  transition: background-color 0.3s;
  &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% - 36px);
    background-color: ${colors.blackF5F6F7};
    bottom: 0;
    left: 18px;
  }
  ${(p) =>
    p.isFocus &&
    css`
      background-color: ${colors.blackF5F6F7};
      .reply-btn.reply-btn {
        color: ${colors.primary};
      }
    `}
  label: Comment;
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 12px;
`;

const ContentBox = styled.div`
  .date {
    font-size: 13px;
    color: ${colors.black99};
    line-height: normal;
  }
  .reply-btn {
    margin-left: 20px;
    font-size: 13px;
    color: ${colors.black66};
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  }
  .delete-btn {
    margin-left: 10px;
    font-size: 13px;
    color: ${colors.black66};
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  }
`;

const Content = styled.div`
  margin: 5px 0 10px;
  line-height: 20px;
  font-size: 15px;
`;

const DeletedComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 36px);
  height: 80px;
  margin: 0 18px;
  background-color: ${colors.blackF5F6F7};
  color: ${colors.black99};
  font-size: 15px;
`;

const EditorBadge = styled(Icon)`
  margin-left: 8px;
`;
