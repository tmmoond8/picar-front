/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { toast } from 'react-toastify';
import { colors } from '../../styles';
import Icon from '../Icon';
import Content from '../Content';
import Emotion from '../Emotion';
import { useModal } from '../Modal';
import { useStore } from '../../stores';
import { useArticleContext, observer } from './context';
import { EmotionType } from '../../types/Emotion';
import APIS from '../../apis';

const ArticleFooter = () => {
  const {
    article,
    commentCount,
    emotionCounts,
  } = useArticleContext();
  const { user } = useStore();
  const modal = useModal();
  const [views, setViews] = React.useState(0);
  const [emotionCount, setEmotionCount] = React.useState(
    article?.emotionCount ?? 0,
  );

  const handleClickEmotion = React.useCallback(() => {
    modal.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <Emotion.Box
          articleId={article!.id}
          myEmotion={user.emotions[article!.id]}
          handleClose={() => modal.close()}
          setEmotionCount={setEmotionCount}
          handleEmotionUpdate={(emotionType: EmotionType) =>
            user.setEmotion(article!.id, emotionType)
          }
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, modal, emotionCount]);

  const handleClickComment = React.useCallback(() => {
    // selector로 가져오는 것이 항상 나쁠까?
    const commentEditor = document.querySelector<HTMLDivElement>(
      '.CommentEditor',
    );
    if (commentEditor) {
      commentEditor.focus();
    }
  }, []);

  React.useEffect(() => {
    if (article?.id) {
      (async () => {
        const views = await APIS.firebase.increaseView(String(article?.id));
        setViews(views);
      })();
    }
  }, [article?.id])

  return (
    <React.Fragment>
      <InteractionCounter>
        <ul>
          <li>{`조회 ${views}회`}</li>
          <li>{`댓글 ${commentCount}`}</li>
          <li>{`공감 ${emotionCount}`}</li>
        </ul>
        <Emotion.Band emotionCounts={emotionCounts} />
      </InteractionCounter>
      <Content.HR size={1} color="" />
      <InteractionPanel>
        <Interaction hasInteraction={!!user.emotions[article!.id]} onClick={handleClickEmotion}>
          <Icon icon="emojiSmileOutline" size="20px" /> 공감표현
        </Interaction>
        <Interaction hasInteraction={!!user.comments[article!.id]} onClick={handleClickComment}>
          <Icon icon="chatOutline" size="20px" /> 댓글쓰기
        </Interaction>
        <Interaction
        hasInteraction={false}
          onClick={() => {
            toast(
              "'시작과끝' 활동 알림을 켭니다. 새 글을 작성하면 알림을 보내드려요",
            );
          }}
        >
          <Icon icon="share" size="20px" /> 공유하기
        </Interaction>
      </InteractionPanel>
    </React.Fragment>
  );
};

export default observer(ArticleFooter);

const InteractionCounter = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  ul {
    display: flex;
    flex: 1;
    padding: 0 18px;
    color: ${colors.black99};
    font-size: 13px;

    li + li {
      position: relative;
      margin-left: 12px;
      &::before {
        content: '·';
        position: absolute;
        left: -10px;
        top: 0;
        font-weight: 600;
      }
    }
  }
`;
const InteractionPanel = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 54px;
  width: 100%;
  max-width: 464px;
  padding: 0 18px;
  margin: 0 auto;
  color: ${colors.black66};

  font-size: 14px;
`;

const Interaction = styled.li<{ hasInteraction: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  .Icon {
    margin-right: 6px;
  }

  ${p => p.hasInteraction && css`
    color: ${colors.primary};
    .Icon {
      color: ${colors.primary};
    }
  `}
`;