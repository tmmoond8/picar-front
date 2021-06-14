/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';
import APIS from '../../apis';
import Article from '../../types/Article';
import { colors } from '../../styles';
import { useInitBefore } from '../../hooks';

const PopularArticleList: React.FC = () => {
  const { article } = useStore();
  useInitBefore(async () => {
    const { data } = await APIS.article.listPop();
    article.popArticles = data.articles;
  });

  return (
    <List className="PopularArticleList">
      {article.popArticles.map(article => (
        <Item
          key={article.id}
          {...article}
        />
      ))}
    </List>
  )
}

export default observer(PopularArticleList);

const List = styled.ol`
  padding: 0 18px;
  background-color: ${colors.white};
`;


const ArticleItem = styled.li`
  display: flex;
  padding: 16px 0;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
  cursor: pointer;

  .TextContent {
    flex: 1;
  }
`;

const TextContent = styled.div`
  .articleTitle {
    font-size: 16px;
    line-height: 1.31;
    color: ${colors.black33};
  }

  .articleGroup {
    margin: 6px 0 0 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.17;
    color: ${colors.black99};
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-left: 16px;
`;

const Item = observer((article: Article) => {
  const { util } = useStore();
  const handleLink = React.useCallback(() => {
    util.history.push(`/article/${article.id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.id])
  console.log(article.photos);
  return (
    <ArticleItem onClick={handleLink}>
      <TextContent className="TextContent">
        <h3 className="articleTitle">{article.title}</h3>
        <p className="articleGroup">{article.group}</p>
      </TextContent>
      {article.thumbnail && <Thumbnail src={article.thumbnail} />}
    </ArticleItem>
  )
})