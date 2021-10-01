/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../../styles';
import Skeleton from 'react-loading-skeleton';
import Content from '../Content';
import { useStore } from '../../stores';

export default function MobileFallback() {
  const { ui } = useStore();
  return (
    <Fallback>
      <Head>
        <Skeleton height={22} width={82} />
        <Skeleton height={22} width={46} style={{ marginLeft: '16px' }} />
        <Skeleton height={22} width={46} style={{ marginLeft: '16px' }} />
        <Skeleton height={22} width={46} style={{ marginLeft: '16px' }} />
      </Head>
      <Body>
        {Array.from({ length: 5 }).map((_, index) => (
          <Article key={index}>
            <ArticleTop>
              <Skeleton circle height={22} width={22} />
              <Skeleton height={22} width={67} style={{ marginLeft: '12px' }} />
              <Content.FlexSpace />
              <Skeleton height={22} width={46} />
            </ArticleTop>
            <ArticleMid>
              <FlexColumn>
                <Skeleton
                  height={22}
                  width={ui.queryMatch.Desktop ? 189 : 122}
                />
                <Skeleton
                  height={22}
                  width={ui.queryMatch.Desktop ? 289 : 220}
                  style={{ marginTop: '12px' }}
                />
              </FlexColumn>
              <Content.FlexSpace />
              <Skeleton height={80} width={80} />
            </ArticleMid>
            <ArticleBottom>
              <Skeleton height={22} width={32} />
              <Skeleton height={22} width={32} style={{ marginLeft: '12px' }} />
              <Content.FlexSpace />
              <Skeleton height={22} width={32} />
            </ArticleBottom>
          </Article>
        ))}
      </Body>
      <Bottom>
        <Skeleton height={28} width={28} />
        <Skeleton height={28} width={28} />
        <Skeleton height={28} width={28} />
        <Skeleton height={28} width={28} />
        <Skeleton height={28} width={28} />
      </Bottom>
    </Fallback>
  );
}

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.blackF5F6F7};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  overflow: hidden;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  min-height: 60px;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: inset 0 -1px 0 0 ${colors.blackEB};
`;

const Article = styled.div`
  padding: 20px;
  border-top: 8px solid ${colors.blackF5F6F7};
  box-shadow: inset 0 -1px 0 0 ${colors.blackEB};
`;

const ArticleTop = styled.div`
  display: flex;
`;

const ArticleMid = styled.div`
  display: flex;
  padding: 16px 0;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArticleBottom = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  min-height: 60px;
  background-color: ${colors.white};
  box-shadow: inset 0 1px 0 0 ${colors.blackEB};
`;
