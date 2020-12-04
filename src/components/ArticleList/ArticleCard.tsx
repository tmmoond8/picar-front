/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Article from '../../types/Article';
import Profile from '../Profile';
import { Profile as IProfile } from '../../types/User';
import Button from '../Button';
import Icon from '../Icon';
import { useStore, observer } from '../../stores';

import BottomSheet from '../BottomSheet';
import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';
import { useCheckLogin } from '../../hooks';

type ArticleCardProps = Article & { bookmark: boolean };

export default observer(function ArticleCard(
  props: ArticleCardProps,
): JSX.Element {
  const {
    title,
    content,
    author,
    createAt,
    id,
    photos,
    commentCount,
    emotionCount,
    bookmark,
  } = props;
  const { thumbnail, name, group } = author as IProfile;
  const history = useHistory();
  const bottomSheet = BottomSheet.useBottomSheet();
  const { article, user } = useStore();

  const needLogin = useCheckLogin(
    user.profile.code,
    user.setProfile,
    bottomSheet,
  );

  const handleClickBookmark = React.useCallback(() => {
    if (needLogin()) {
      return;
    }
    if (bookmark) {
      article.removeBookmark(id);
    } else {
      article.addBookmark(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, bookmark, id]);

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
          onClick={() => {}}
        >
          <Counter className="Counter">{emotionCount}</Counter>
        </Button>
        <Button icon={<Icon icon="chat" size="18px" />} onClick={() => {}}>
          <Counter className="Counter">{commentCount}</Counter>
        </Button>
        <div className="right">
          <BookmarkButton
            marked={bookmark}
            onClick={handleClickBookmark}
            icon={<Icon icon="bookmark" size="18px" />}
          />
        </div>
      </Bottom>
    </Card>
  );
});

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

  & > button {
    cursor: auto;
    border: none;
  }
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

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;

const BookmarkButton = styled(Button)<{ marked: boolean }>`
  width: 41px;
  height: 28px;
  transition: background-color 0.3s ease-in-out;
  svg {
    margin: 0 auto;
    cursor: pointer;
  }
  ${(p) =>
    p.marked &&
    css`
      background-color: ${colors.primaryE};
      border: none;
      svg {
        color: ${colors.primary3};
      }
    `}
`;
