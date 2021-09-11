/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Logo from '../Logo';
import { colors } from '../../styles';
import Skeleton from 'react-loading-skeleton';
import Content from '../Content';
import { useStore } from '../../stores';

export default function DesktopFallback() {
  const { ui } = useStore();
  return (
    <Desktop>
      <header>
        <DesktopHeaderSpaceBetween>
          <Logo color={colors.black40} />
          <DesktopHeaderRight>
            <Skeleton circle={true} height={48} width={48}/>
            <Skeleton height={44} width={82} />
            <Skeleton height={44} width={82} />
          </DesktopHeaderRight>
        </DesktopHeaderSpaceBetween>
      </header>
      <DesktopBody>
        <DesktopLeft>
          <ContentHead>
            <Skeleton height={22} width={82} />
            <Skeleton height={22} width={46} />
            <Skeleton height={22} width={46} />
            <Skeleton height={22} width={46} />
          </ContentHead>
          {Array.from({length: 5}).map((_, index) => (
            <Article key={`article-skeleton-${index}`}>
              <ArticleTop>
                <Skeleton circle height={22} width={22} />
                <Skeleton height={22} width={67} style={{marginLeft: '12px'}}/>
                <Content.FlexSpace />
                <Skeleton height={22} width={46} />
              </ArticleTop>
              <ArticleMid>
                <FlexColumn>
                  <Skeleton height={22} width={ui.queryMatch.Desktop ? 189 : 122} />
                  <Skeleton height={22} width={ui.queryMatch.Desktop ? 289 : 220} style={{marginTop: '12px'}}/>
                </FlexColumn>
                <Content.FlexSpace />
                <Skeleton height={80} width={80} />
              </ArticleMid>
              <ArticleBottom>
                <Skeleton height={22} width={32} />
                <Skeleton height={22} width={32} style={{marginLeft: '12px'}}/>
                <Content.FlexSpace />
                <Skeleton height={22} width={32} />
              </ArticleBottom>
            </Article>
          ))}
        </DesktopLeft>
        <DesktopRight>
          <PopHead >
            <Skeleton height={28} width={56} />
            <Content.FlexSpace />
            <Skeleton height={32} width={33} />
            <Skeleton height={32} width={33} />
          </PopHead>
          {Array.from({ length: 7}).map((_, index) => (
            <PopArticle key={`pop-article-skeleton-${index}`}>
              <Skeleton height={22} width={212} />
              <Skeleton height={18} width={101} style={{marginTop: '6px'}}/>
            </PopArticle>
          ))}
        </DesktopRight>
      </DesktopBody>
    </Desktop>
  )
}

const Desktop = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.blackF5F6F7};

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    min-height: 64px;
    background-color: ${colors.white};
  }
`;

const DesktopHeaderSpaceBetween = styled(Content.SpaceBetween)`
  width: 100%;
  max-width: 952px;
  padding: 0 32px;
`

const DesktopHeaderRight = styled.div`
  span {
    margin-left: 8px;
  }
`;

const DesktopBody = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 22px;
`;

const DesktopLeft = styled.div`
  height: 100%;
  flex: 1;
  min-width: 320px;
  max-width: 600px;
  background-color: ${colors.white};
  overflow: hidden;
`;

const DesktopRight = styled.div`
  height: fit-content;
  width: 328px;
  background-color: ${colors.white};
  margin-left: 24px;
`;

const ContentHead = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackEB};

  span + span {
    margin-left: 16px;
  }
`;

const Article = styled.div`
  padding: 20px;
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

const PopHead = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackEB};
`;

const PopArticle = styled.div`
  height: 92px;
  padding: 22px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackEB};
`;