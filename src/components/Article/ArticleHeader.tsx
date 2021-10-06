/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '../Icon';
import RadioButton from '../RadioButton';
import { colors } from '../../styles';
import Content from '../Content';
import { useStore } from '../../stores';
import { useMoreMenu } from './hooks';
import { useStateRef } from '../../hooks';
import { useArticleContext, observer } from './context';
import { useModal } from '../Modal';
import Button from '../Button';

const ArticleHeader: React.FC = () => {
  const { user, ui, util } = useStore();
  const { article } = useArticleContext();
  const modal = useModal();
  const [reportContent, setReportContent, reportContentRef] =
    useStateRef<string>('불법정보 또는 불법 홍보물');

  const bookmark = React.useMemo(() => {
    return article?.id && user.bookmarks.has(article.id);
  }, [article, user.bookmarks]);

  const handleClickBookmark = React.useCallback(async () => {
    if (user.needLogin() || !article) {
      return;
    }
    if (bookmark) {
      user.removeBookmark(article.id);
      toast('북마크에서 제거했습니다.');
    } else {
      user.addBookmark(article.id);
      toast('북마크에 추가했습니다.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark, article]);

  const handleSubmitReport = async (commentId?: string) => {
    if (article?.id) {
      await user.addReport(article.id, reportContentRef.current, commentId);
      modal.close();
      toast('신고가 접수되었습니다.');
    }
  };

  const handleClickMore = useMoreMenu(article ?? undefined);
  const handleGoBack = () => util.history.goBack();
  const handleAddReport = (commentId?: string) => {
    if (article?.id) {
      modal.open({
        title: '게시글 신고',
        hasBottomCTA: true,
        contents: (
          <React.Fragment>
            <RadioButton
              options={[
                '불법정보 또는 불법 홍보물',
                '욕설 또는 인신공격',
                '음란물 또는 청소년에게 부적합한 내용',
                '반복 정보 게시 (도배글)',
                '기타',
              ]}
              defaultValue={reportContent}
              setValue={setReportContent}
            />
            <Button.BottomCTA
              onClick={() => handleSubmitReport()}
              disabled={false}
            >
              제출
            </Button.BottomCTA>
          </React.Fragment>
        ),
      });
    }
  };

  const handleRemoveReport = (commentId?: string) => {
    if (article?.id) {
      modal.open({
        title: '게시글 신고 취소',
        hasBottomCTA: true,
        contents: (
          <React.Fragment>
            <Content.Spacing size={16} />
            <p>{`${
              commentId ? 'ㅤㅤ댓글' : 'ㅤㅤ게시글'
            } 신고를 취소하시겠어요?`}</p>
            <Content.Spacing size={12} />
            <Button.BottomCTA
              onClick={() => {
                user.removeReport(article.id, commentId);
                toast('신고가 취소되었습니다.');
                modal.close();
              }}
              disabled={false}
            >
              신고 취소
            </Button.BottomCTA>
          </React.Fragment>
        ),
      });
    }
  };

  return (
    <Header desktop={ui.queryMatch.Desktop}>
      <Icon
        icon="back"
        size="24px"
        color={colors.black}
        onClick={handleGoBack}
      />
      {article && !article.isDelete && (
        <Right>
          {user.profile.code !== article?.author.code && (
            <Icon
              icon="alarmLight"
              size="24px"
              color={
                user.reports.some(
                  ({ articleId, commentId }) =>
                    articleId === article.id && !commentId,
                )
                  ? colors.red
                  : colors.black
              }
              onClick={() => {
                if (
                  user.reports.some(
                    ({ articleId, commentId }) =>
                      articleId === article.id && !commentId,
                  )
                ) {
                  handleRemoveReport();
                } else {
                  handleAddReport();
                }
              }}
            />
          )}
          <Icon
            icon="bookmarkOutline"
            size="24px"
            color={bookmark ? colors.black : colors.transparent}
            onClick={handleClickBookmark}
          />
          {user.profile.code === article?.author.code && (
            <Icon
              icon="more"
              size="24px"
              color={colors.black}
              onClick={handleClickMore}
            />
          )}
        </Right>
      )}
    </Header>
  );
};

export default observer(ArticleHeader);

const Header = styled.nav<{ desktop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  ${(p) =>
    p.desktop &&
    css`
      box-shadow: 0 1px ${colors.blackF5F6F7};
      height: 56px;
    `}
`;

const Right = styled.div`
  display: flex;
  .Icon {
    cursor: pointer;
  }
  .Icon + .Icon {
    margin: 0 0 0 16px;
  }
`;
