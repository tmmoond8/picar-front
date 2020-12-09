/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import { useArticleContext, observer } from './context';

const ArticleBody = () => {
  const { article } = useArticleContext();

  return (
    <Self>
      <Title>{article!.title}</Title>
      <Content>{article!.content}</Content>
      {article!.photos && (
        <ImageWrapper>
          <Image src={article!.photos} />
        </ImageWrapper>
      )}
    </Self>
  );
};
export default observer(ArticleBody);

const Self = styled.div`
  padding: 10px 18px;
`;
const Title = styled.h1`
  font-size: 18px;
  color: ${colors.black100};
  line-height: 26px;
`;

const Content = styled.p`
  margin: 24px 0 0 0;
  font-size: 16px;
  color: ${colors.black33};
  line-height: 24px;
`;

const ImageWrapper = styled.div`
  margin: 37px -18px 0 -18px;
  width: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
