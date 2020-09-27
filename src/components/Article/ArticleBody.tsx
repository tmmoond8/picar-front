/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';

interface ArticleBodyProps {
  title: string;
  content: string;
}

export default function ArticleBody(props: ArticleBodyProps): JSX.Element {
  const { title, content } = props;
  return (
    <Self>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Image src="https://pelicana.co.kr/resources/images/menu/hotdevil_menu_200623.jpg" />
    </Self>
  );
}

const Self = styled.div``;
const Title = styled.h1`
  margin: 10px 18px 0;
  font-size: 18px;
  color: ${colors.black100};
  line-height: 26px;
`;

const Content = styled.p`
  margin: 24px 18px 0;
  font-size: 16px;
  color: ${colors.black33};
  line-height: 24px;
`;

const Image = styled.img`
  margin: 37px 0 0 0;
  width: 100%;
  height: auto;
`;
