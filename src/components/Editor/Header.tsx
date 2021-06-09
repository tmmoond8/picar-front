/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import Carousel from '../Carousel';
import { useEditorContext } from './context';
import { CAROUSEL } from '../../types/constants';
import { colors } from '../../styles';
import API from '../../apis';
import Icon from '../Icon';
import { useAlert } from '../Alert';
import { useStore, observer } from '../../stores';

const Header: React.FC = () => {
  const {
    title,
    content,
    selected,
    article,
    step,
    photos,
    thumbnail,
    isOnImageUpload,
    onClose,
    setStep,
    syncArticle,
  } = useEditorContext();
  const { util } = useStore();
  const history = util.useHistory();

  const handleGoBack = React.useCallback(() => {
    setStep(step - 1);
    (window as any).__OWNER__[CAROUSEL.EDITOR](step - 1);
  }, [step])
  const alert = useAlert();

  const validate = React.useCallback(() => {
    if (title.length === 0) {
      toast.success('제목을 입력하세요.');
      return false;
    }
    if (content.length === 0) {
      toast.success('내용을 입력하세요.')
      return false;
    }
    return true;
  }, [title, content])

  const handleClickUpdate = React.useCallback(async () => {
    if (!validate() || !article) return;
    try {
      const { data } = await API.article.update(article.id, {
        title,
        content,
        group: selected,
        photos,
        thumbnail: photos ? thumbnail : '',
      });
      if (data.ok) {
        syncArticle(data.article);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [title, content, article, selected, thumbnail, photos, syncArticle, onClose]);

  const handleClickPost = React.useCallback(async () => {
    if (!validate()) return;
    try {
      const { data } = await API.article.write({
        title,
        content,
        group: selected,
        photos,
        thumbnail: photos ? thumbnail : '',
      });
      syncArticle(data.article);
      onClose();
      setTimeout(() => {
        history.push(`/article/${data.article.id}`);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  }, [title, content, selected, thumbnail, photos, syncArticle, onClose, history]);

  const handleSubmit = React.useMemo(() => {
    return article ? handleClickUpdate : handleClickPost;
  }, [article, handleClickPost, handleClickUpdate]);

  const disabledWrite = React.useMemo(() => {
    return title.length === 0 || content.length === 0 || isOnImageUpload;
  }, [content.length, title.length, isOnImageUpload]);

  const handleClose = React.useCallback(() => {
    if (
      (title === article?.title || title === '') &&
      (content === article?.content || content === '') &&
      (photos === article?.photos || photos === '')
    ) {
      return onClose();
    }
    alert.open({
      title: `작성중인 글쓰기를 삭제하고
이전페이지로 돌아갑니다`,
      subtitle: `작성중인 글쓰기를 삭제하고 이전페이지로 돌아갑니다이전페이지로 돌아갑니다이전페이지로 돌아갑니다`,
      handleConfirm: onClose
    })
  }, [title, content, photos])

  const HeaderRight = (
    <SendButton onClick={handleSubmit} disabled={disabledWrite}>
      <Icon
        icon="vCheck"
        size="24px"
        color={disabledWrite ? colors.blackEB : colors.black22}
      />
    </SendButton>
  )

  return (
    <StyledHeader
      title={article ? '글 수정' : '글 작성'}
      onBack={handleGoBack}
      onClose={handleClose}
      step={step}
      right={HeaderRight}
      hideRight={step !== 0}
    />
  )
}

export default observer(Header);

const StyledHeader = styled(Carousel.Header) <{ hideRight: boolean }>`
  ${p => p.hideRight && css`
    .right {
      display: none;
    }
  `}
`;

const SendButton = styled.button<{ disabled: boolean }>`
  position: fixed;
  right: 18px;
  top: 18px;
  font-size: 16px;
  color: ${colors.primary};
    padding: 0;
  cursor: pointer;

  ${p => p.disabled && css`
    cursor: none;
    pointer-events: none;
  `}
`;
