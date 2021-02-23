/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Album from './ArticlePhotoAlbum';
import { colors } from '../../styles';
import { useArticleContext, observer } from './context';

const ArticleBody = () => {
  const { article } = useArticleContext();
  const urlPattern = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi
  const content = React.useMemo(() => {
    return article!.content.replace(urlPattern, `<a href="$&" target="_blank">$&</a>`)
  }, [article!.content])
  const photos = React.useMemo(() => {
    return article!.photos ? article!.photos.split(',').filter(p => !!p) : []
  }, [article!.photos])

  return (
    <Body>
      <Lounge>{article!.group}</Lounge>
      <Title>{article!.title}</Title>
      <Content dangerouslySetInnerHTML={{
        __html: content
      }}/>
      <Album photos={photos} />
    </Body>
  );
};
export default observer(ArticleBody);

const Body = styled.div`
  padding: 8px 18px 10px;
  overflow-x: hidden;
`;

const Title = styled.h1`
  margin: 12px 0 0 0;
  font-size: 18px;
  color: ${colors.black100};
  line-height: 26px;
`;

const Content = styled.pre`
  margin: 24px 0 0 0;
  font-size: 16px;
  color: ${colors.black33};
  line-height: 24px;
  word-break: break-all;
  white-space: pre-wrap;

  a {
    color: ${colors.primary};
  }
`;

const Lounge = styled.p`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${colors.blackF5F6F7};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  border-radius: 8px;
  color: ${colors.black77};
`;
