/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router';
import Icon from '../Icon';
import APIS from '../../apis';
import { colors } from '../../styles';
import ArticleType from '../../types/Article';
import { useInitBefore } from '../../hooks';
import { useStore, observer } from '../../stores';

const SIZE = 5;

const PopularArticles: React.FC<{}> = () => {
  const { util } = useStore();
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [popArticles, setPopArticles] = React.useState<ArticleType[]>([]);
  const articles = React.useMemo(() => {
    return popArticles.filter((_, index) => index >= (page * SIZE) && index < (page + 1) * SIZE);
  }, [page, popArticles]);
  const pagePrev = React.useCallback(() => {
    setPage(Math.max(page - 1, 0));
  }, [page])
  const pageNext = React.useCallback(() => {
    setPage(Math.min(page + 1, Math.floor(popArticles.length / SIZE)));
  }, [page])

  useInitBefore(async () => {
    const { data } = await APIS.article.listPop();
    setPopArticles(data.articles)
  });

  const handleClickLink = React.useCallback((articleId: number) => {
    if (location.pathname.includes('/article')) {
      util.history.replace(`/article/${articleId}`);
    } else {
      util.history.push(`/article/${articleId}`);
    }
  }, [location, util])

  return (
    <StyledPopularArticles className="PopularArticles">
      <Header>
        <h3>인기 글</h3>
        <Navigations>
          <NavItem onClick={pagePrev} disabled={page === 0}><Icon icon="arrowLeft"/></NavItem>
          <NavItem onClick={pageNext} disabled={page === Math.floor(popArticles.length / SIZE)}><Icon icon="arrowRight" /></NavItem>
        </Navigations>
      </Header>
      <List>
        {articles.map(article => (
          <Article key={article.title} onClick={() => handleClickLink(article.id)}>
            <h4>{article.title}</h4>
            <h6>{article.group}</h6>
          </Article>
        ))}
      </List>
    </StyledPopularArticles>
  );
};

export default observer(PopularArticles);

const StyledPopularArticles = styled.div`
  width: 264px;
  background-color: ${colors.white};
`;

const Header =  styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 12px 0 20px;
  box-shadow: 0 1px 0 0 ${colors.blackEB};

  h3 {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.25px;
    color: #222222;
  }
`;

const Navigations = styled.nav`
  height: 32px;
  display: flex;
  border: 1px solid ${colors.blackEB};
`;

const NavItem = styled.div<{ disabled: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  cursor: pointer;
  color: ${p => p.disabled ? colors.blackEB : colors.black33};
  
  & + & {
    border-left: 1px solid ${colors.blackEB};
  }

  .icon {
    cursor: pointer;
    color: ${colors.black33};
  }
  ${p => p.disabled && css`
    pointer-events: none;
    .icon {
      color: ${colors.blackEB};
    }
  `};
`;

const List = styled.ul`
  padding: 4px 0;
`;

const Article = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 77px;
  padding: 8px 20px;
  cursor: pointer;
  :hover {
    background-color: ${colors.blackF7};
  }

  h4 {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
  }

  h6 {
    margin-top: 3px;
    font-size: 12px;
    color: ${colors.black84};
    word-break: break-all;
  }
`;
