/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import Profile from '../Profile';

import { getDateGoodLook } from '../../modules/string';

interface ArticleHeadProps {
  authorId: string;
  name: string;
  group?: string;
  createdDate: string;
}

export default function ArticleHead(props: ArticleHeadProps): JSX.Element {
  const { authorId, name, group, createdDate } = props;
  return (
    <Self>
      <Profile.Photo onClick={() => console.log(authorId)} />
      <Content>
        <Profile.Who name={name} group={group} />
        <p className="date">{getDateGoodLook(createdDate)}</p>
      </Content>
    </Self>
  );
}

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
