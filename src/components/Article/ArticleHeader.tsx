/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '../Icon';
import { colors } from '../../styles';
import { useStore } from '../../stores';
import { useMoreMenu } from './hooks';
import { useReport } from '../../hooks';
import { useArticleContext, observer } from './context';

const ArticleHeader: React.FC = () => {
  const { user, ui, util } = useStore();
  const { article } = useArticleContext();

  const { openReport, openCancelReport } = useReport({
    articleId: article?.id,
  });

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

  const handleClickMore = useMoreMenu(article ?? undefined);
  const handleGoBack = () => util.history.goBack();

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
                  openCancelReport();
                } else {
                  openReport();
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
