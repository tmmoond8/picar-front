/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';

interface ArticleBodyProps {
  title: string;
  content: string;
  photos: string | null;
}

export default function ArticleBody(props: ArticleBodyProps): JSX.Element {
  const { title, content, photos } = props;
  return (
    <Self>
      <Title>{title}</Title>
      <Content>{content}</Content>
      {photos && (
        <ImageWrapper>
          <Image src={photos} />
        </ImageWrapper>
      )}
    </Self>
  );
}

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
