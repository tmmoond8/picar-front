/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Article from '../../types/Article';
import Profile from '../Profile';
import { Profile as IProfile } from '../../types/User';
import Button from '../Button';
import Icon from '../Icon';
import BottomSheet from '../BottomSheet';
import Comment from '../Comment';
import Emotion from '../Emotion';

import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';

type ArticleCardProps = Article;

export default function ArticleCard(props: ArticleCardProps): JSX.Element {
  const {
    title,
    content,
    author,
    createAt,
    id,
    photos,
    commentCount,
    emotionCount,
  } = props;
  const bottomSheet = BottomSheet.useBottomSheet();
  const { thumbnail, name, group } = author as IProfile;
  const history = useHistory();
  const handleClickEmotion = React.useCallback(() => {
    if (id) {
      bottomSheet.open({
        title: `공감 ${emotionCount}`,
        contents: (
          <Emotion.Box articleId={id} handleClose={bottomSheet.close} />
        ),
      });
    }
  }, [id, bottomSheet, emotionCount]);
  const handleClickComment = React.useCallback(() => {
    if (id) {
      bottomSheet.open({
        title: `댓글 ${commentCount}`,
        contents: <Comment articleId={id} />,
      });
    }
  }, [bottomSheet, id, commentCount]);
  const handleClickBookmark = React.useCallback(() => {
    console.log(title);
  }, [title]);

  const handleClickArticle = React.useCallback(() => {
    history.push(`/article/${id}`);
  }, [history, id]);

  return (
    <Card>
      <Head>
        <ProfilePhoto src={thumbnail} size={24} />
        <Profile.Who name={name} group={group} />
        <p className="article-time">{getDateGoodLook(createAt)}</p>
      </Head>
      <Body onClick={handleClickArticle}>
        <div className="article-content-wrapper">
          <p className="article-title">{title}</p>
          <p className="article-content">{content}</p>
        </div>
        {photos && <Thumbnail src={photos} />}
      </Body>
      <Bottom>
        <Button
          icon={<Icon icon="emojiSmile" size="18px" />}
          onClick={handleClickEmotion}
        >
          {emotionCount}
        </Button>
        <Button
          icon={<Icon icon="chat" size="18px" />}
          onClick={handleClickComment}
        >
          {commentCount}
        </Button>
        <div className="right">
          <Button
            onClick={handleClickBookmark}
            icon={<Icon icon="bookmark" size="18px" />}
          />
        </div>
      </Bottom>
    </Card>
  );
}

const Card = styled.li`
  padding: 16px 18px;
  background-color: ${colors.white};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  .article-time {
    flex: 1;
    text-align: right;
    font-size: 13px;
    color: ${colors.black99};
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 8px;
`;

const Body = styled.div`
  display: flex;
  padding: 16px 0;
  cursor: pointer;

  .article-content-wrapper {
    flex: 1;
  }

  .article-title {
    font-size: 17px;
    line-height: 24px;
    color: ${colors.black100};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article-content {
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.black99};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 2px;
  object-fit: contain;
  margin-left: 16px;
`;

const Bottom = styled.div`
  display: flex;
  height: 32px;
  * + * {
    margin-left: 8px;
  }
  margin-top: 4px;
  .right {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }
`;
