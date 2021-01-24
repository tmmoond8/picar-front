/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Icon from '../Icon';
import { colors } from '../../styles';
import { LOUNGES } from '../../types/constants';
import { useStore } from '../../stores';
import { useMoreMenu } from './hooks';
import { useArticleContext, observer } from './context';

const ArticleHeader: React.FC = () => {
  const { user, ui } = useStore();
  const {
    article,
  } = useArticleContext();

  const breadbump = React.useMemo(() => {
    if (!article) {
      return '';
    }
    return LOUNGES.map(({name}) => name).includes(article.group) ? `라운지 > ${article.group}` : article.group;
  }, [article]);
  
  const bookmark = React.useMemo(() => {
    return article?.id && user.bookmarks.has(article.id);
  }, [article, user.bookmarks]);

  const handleClickBookmark = React.useCallback(async () => {
    if (user.needLogin() || !article) {
      return;
    }
    if (bookmark) {
      user.removeBookmark(article.id);
    } else {
      user.addBookmark(article.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark, article]);

  const handleClickMore = useMoreMenu(article ?? undefined);

  return (
    <Nav >
      {ui.queryMatch.Mobile && <Icon icon="back" size="24px" color={colors.black}/>}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && (<Left>{breadbump}</Left>)}
      <Right>
        <Icon 
          icon="bookmarkOutline" 
          size="24px" 
          color={bookmark ? colors.black : colors.transparent}
          onClick={handleClickBookmark}
        />
        <Icon 
          icon="more" 
          size="24px" 
          color={colors.black}
          onClick={handleClickMore}
        />
      </Right>
    </Nav>
  );
}

export default observer(ArticleHeader);

const HEIGHT = 56;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEIGHT}px;
  padding: 0 20px;
  box-shadow: 0 1px ${colors.blackEB};
`;

const Left = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.86;
  color: ${colors.black77};
`;
const Right = styled.div`
  display: flex;
  .icon {
    cursor: pointer;
  }
  .icon + .icon {
    margin: 0 0 0 16px;
  }
`;
