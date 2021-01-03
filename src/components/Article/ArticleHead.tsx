/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import Profile from '../Profile';

import { getDateGoodLook } from '../../modules/string';
import { useArticleContext, observer } from './context';

const ArticleHead = () => {
  const { article } = useArticleContext();
  const { thumbnail, id, name, group } = article!.author;
  return (
    <Self>
      <Profile.Photo src={thumbnail} onClick={() => console.log(id)} />
      <Content>
        <Profile.WhoDot name={name} group={group} />
        <p className="date">{getDateGoodLook(article!.createAt)}</p>
      </Content>
    </Self>
  );
};
export default observer(ArticleHead);

const Self = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0 16px;
`;

const Content = styled.div`
  margin: 0 0 0 13px;

  .date {
    margin: 1px 0 0 0;
    font-size: 13px;
    color: ${colors.black99};
  }
`;
