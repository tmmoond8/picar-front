/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Icon from '../Icon';
import { colors } from '../../styles';
import { LOUNGE, LOUNGES } from '../../types/constants';
import Article from '../../types/Article';
import { useStore } from '../../stores';
import { useMoreMenu } from './hooks';
import { useArticleContext, observer } from './context';

const ArticleHeader: React.FC = () => {
  const { user, ui, util, article: articleStore } = useStore();
  const {
    article,
  } = useArticleContext();
  
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

  const { breadbump, handleClickBreadbump } = useBreadBump(article, {
    setGroup: (group: string) => articleStore.selectedGroup = group,
    setLounge: (lounge: string) => articleStore.selectedLounge = lounge,
    goHome: () => util.history.push('/'),
  });
  const handleClickMore = useMoreMenu(article ?? undefined);
  const handleGoBack = () => util.history.goBack();

  return (
    <Header >
      {ui.queryMatch.Mobile && <Icon icon="back" size="24px" color={colors.black} onClick={handleGoBack}/>}
      {!ui.queryMatch.Mobile && (<Left onClick={handleClickBreadbump}>{breadbump}</Left>)}
      <Right>
        <Icon 
          icon="bookmarkOutline" 
          size="24px" 
          color={bookmark ? colors.black : colors.transparent}
          onClick={handleClickBookmark}
        />
        {user.profile.code === article?.author.code && <Icon 
          icon="more" 
          size="24px" 
          color={colors.black}
          onClick={handleClickMore}
        />}
      </Right>
    </Header>
  );
}

export default observer(ArticleHeader);

const HEIGHT = 56;

const Header = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEIGHT}px;
  padding: 0 20px;
  /* box-shadow: 0 1px ${colors.blackEB}; */
`;

const Left = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.86;
  color: ${colors.black77};
  cursor: pointer;
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

function useBreadBump(article: Article | null, handler: {
  setGroup: (group: string) => void;
  setLounge: (lounge: string) => void;
  goHome: () => void;
}) {
  const [group, setGroup] = React.useState(article ? article.group: '');
  const isLounge = React.useMemo(() => 
    LOUNGES.map(({name}) => name).includes(group), 
    [group]
  )
  const handleClickBreadbump = React.useCallback(() => {
    if (isLounge) {
      handler.setGroup(LOUNGE);
      handler.setLounge(group);
    } else {
      handler.setGroup(group);
    }
    handler.goHome();
  },[isLounge]);

  React.useEffect(() => setGroup(article ? article.group : ''), [article])

  return {
    breadbump: isLounge ? `라운지 > ${group}` : group,
    handleClickBreadbump,
  }
}