/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

import ArticleList from '../ArticleList';
import UserList from './UserList';
import Carousel from '../Carousel';
import { CAROUSEL } from '../../types/constants';
import Article from '../../types/Article';
import { useStore, observer} from '../../stores';

const tabs = [ 
  { id: 'article', display: '게시글' }, 
  { id: 'nickname', display: '닉네임' }, 
];

const SearchResults: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(1);
  const { article, user } = useStore();
  const handleClickTab = React.useCallback((tab) => {
    const tabIndex = tabs.findIndex(({ id }) => id === tab.id);
    (window as any).__OWNER__[CAROUSEL.SEARCH](tabIndex);
    setTabIndex(tabs.findIndex(({ id }) => id === tab.id));
  }, [])

  return (
    <Wrapper>
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab className="tab" onClick={() => handleClickTab(tab)} selected={index === tabIndex}>
            {tab.display}
          </Tab>)
        )}
      </Tabs>
      <Carousel
        id={CAROUSEL.SEARCH}
        index={tabIndex}
        onChangeIndex={setTabIndex}
      >
        <ArticleList
          articles={test.filter((_, i) => i % 2 ===0)}
          bookmarks={user.bookmarks}
        />
        <UserList/>
      </Carousel>
    </Wrapper>
  )
}

export default observer(SearchResults);

const Wrapper = styled.div`
  flex: 1;
`;

const Tabs = styled.ol`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
  .tab + .tab {
    margin: 0 0 0 18px;
  }
`;

const Tab = styled.li<{selected: boolean}>`
    flex: 1;
    line-height: 44px;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    color: ${p => p.selected ? colors.black33 : colors.blackBF};
    
    cursor: pointer;
    ${p => p.selected && css`
      box-shadow: inset 0 -1px 0 0 ${colors.black33};
    `}
`;


var test: Article[] = [{"id":11,"title":"에이리얼","content":"2018년 데뷔한 로즈핑거에서 하얀이 탈퇴하고 다비가 합류한 후 재데뷔하는 그룹이다.\n막내 다비는 에이리얼 합류 전, 유디라는 이름으로 미드나잇에 합류하였으나 불과 한 달 만에 탈퇴한 이력이 있다.\n2020년 12월 16일 혜빈과 다비가 건강상의 이유로 탈퇴 그룹은 잠정적으로 활동을 중단한다며 비공식적인 입장을 전했다. 추후 멤버를 보강해 활동을 재개할 것이다라며 입장을 밝혔다. 이로써 4인조에서 2인조로 바뀌게 되었다. #","group":"자유","photos":"https://res.cloudinary.com/dhfi7dxpu/image/upload/v1609653628/owner/rn5lp8kosr45vd2fwbzo.png","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2021-01-02T21:00:28.173Z","updateAt":"2021-01-02T21:00:28.173Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":9,"title":"[커버스토리]당신의 유머 센스를 ‘레벨 업’ 하는 법!","content":"나의 유머 코드 찾기\n\n웃기는 사람이 되고 싶은가. 유머집을 뒤적이고 있다면 잠시 덮어두자. 그럴 만한 이유가 있다. 신경과학자이자 심리학자인 로버트 프로빈 교수(미국 메릴랜드대학)가 사람들이 자연스럽게 웃는 1200가지 사례를 분석했다. 그런데 정형화된 유머에 웃은 경우는 20%에 불과했다. 프로빈 교수는 “서로가 장난기 어린 분위기를 공유하면서 긍정적인 말투로 대화할 때 자연스러운 웃음이 가장 많이 나왔다”고 설명했다. 즉 외워서 풀어놓는 우스개보다는 사람들과 소통하는 과정에서 웃음의 신경망을 툭 건드리는 유머러스한 태도가 중요하다는 얘기다.\n\n<웃음의 힘>을 쓴 독일 심리학자 토마스 홀트베른트는 “유머의 핵심은 우스꽝스러움 그 자체가 아니라 유희적인 태도로 자유롭게 유머와 진지함을 넘나드는 독특한 방식에 있다”고 말한다. 자신만의 그 독특한 방식을 탐색해보는 것은 어떨까. 아래 예시 가운데 자신이 크게 웃었거나 타인에게 웃음을 선사했던 순간과 가장 유사한 에피소드를 고른 뒤, 어떤 유형으로 분류되는지 살펴보자 (복수 선택 가능).\n\n유형은 유머이론과 유머의 구현 방식을 기준으로 네 가지로 준비했다. 자신이 고른 에피소드가 가장 집약된 유형을 살펴보면 자신의 유머코드 혹은 ‘유머력’을 감지할 수 있을 것이다. 자기의 유머센스의 약점과 강점도 파악할 수 있기를 바란다.너무 심각하고 진지하게 살면 오히려 갈등은 증폭되고 문제 해결의 실마리가 보이지 않는다. 유머는 유쾌하게 살기 위한 몸부림이다.\n\n","group":"유머","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T19:07:24.211Z","updateAt":"2020-12-30T19:07:24.211Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":8,"title":"(여자)아이들, 내달 '화'로 컴백…전곡 자작곡 미니앨범","content":"(서울=연합뉴스) 김효정 기자 = '셀프 프로듀싱'이 강점인 걸그룹 (여자)아이들이 전곡을 자작곡으로 채운 새 미니앨범으로 돌아온다.\n\n31일 소속사 큐브엔터테인먼트에 따르면 (여자)아이들은 오는 1월 11일 미니 4집 'I burn'(아이 번)을 발매한다.\n\n이날 공개된 트랙리스트에 따르면 새 앨범에는 (여자)아이들의 음악 창작을 주도해온 리더 소연뿐만 아니라 멤버 민니와 우기 등이 작업에 참여했다.\n\n타이틀곡 '화'(火花)는 이별 후의 감정을 '화'라는 중의적 소재로 표현한 곡으로 소연과 작곡가 팝 타임(Pop Time)이 호흡을 맞췄다. 두 사람은 올해 좋은 반응을 얻은 여름 싱글 '덤디덤디 (DUMDi DUMDi)'를 함께 작업한 바 있다.\n\n\n첫 트랙 '한'(寒)은 '홍연', '상사화' 등 한국적 정서가 담긴 음악으로 사랑받는 싱어송라이터 안예은이 소연과 의기투합해 눈길을 끈다.\n\n민니는 3번 트랙 '문'(MOON)과 마지막 트랙 '달리아'(DAHLIA), 우기는 5번 트랙 '로스트'(LOST) 작사·작곡진에 이름을 올렸다.\n\n(여자)아이들은 소연을 주축으로 한 멤버들의 자체 프로듀싱 능력으로 주목받는 걸그룹으로 '라타타', '라이언' 등 개성이 뚜렷한 노래들로 사랑받았다.","group":"자유","photos":"https://res.cloudinary.com/dhfi7dxpu/image/upload/v1609387512/owner/n7jip5dqh5g2qiegrvkq.jpg","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T19:05:14.655Z","updateAt":"2020-12-30T19:05:14.655Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":7,"title":"니쥬, '메이크 유 해피' 뮤비 2억뷰…오늘 홍백가합전 출격\n송고시간2020-12-31 10:49 ","content":"(서울=연합뉴스) 김효정 기자 = JYP엔터테인먼트의 일본 걸그룹 니쥬(NiziU)가 프리 데뷔곡 '메이크 유 해피'(Make you happy) 뮤직비디오로 유튜브 2억 뷰를 달성했다.\n\n31일 JYP에 따르면 지난 6월 발표된 '메이크 유 해피' 뮤직비디오는 이날 오전 1시 40분께 유튜브 조회 수 2억 회를 돌파했다.\n\n'메이크 유 해피'는 아홉 멤버의 풋풋함과 포인트 안무인 '줄넘기 댄스' 등이 부각된 곡이다. 이 곡이 담긴 동명 미니앨범은 오리콘 주간 합산 앨범 랭킹 1위를 차지하는 등 일본 현지에서 큰 인기를 얻었다.\n\n이달 발표한 정식 데뷔 싱글 '스텝 앤드 어 스텝'(Step and a step) 역시 오리콘 주간 싱글 차트 1위에 오르는 등 흥행했다.\n\n\n니쥬는 JYP가 일본 소니뮤직과 함께 선보인 걸그룹 오디션 프로그램 '니지 프로젝트'를 통해 결성됐다. 멤버 모두 일본인이지만, JYP 본사에서 한국식 아이돌 트레이닝을 받았다.\n\n이들은 31일 일본의 대표적 연말 특집 프로그램인 NHK '홍백가합전'에 출연한다. 정식 데뷔 29일 만에 일본 최고 인기 가수들이 출연하는 '홍백가합전'에 입성해 주목받았다.\n\n전날엔 일본 TBS에서 방영된 음악 시상식 '일본 레코드 대상'에 참석해 특별상을 수상하고 기념 무대를 꾸몄다. 지난 25일에는 TV아사히 '엠스테'의 '울트라 슈퍼 라이브 2020'에 출연하는 등 현지 프로그램에 잇따라 등장했다.","group":"자유","photos":"https://res.cloudinary.com/dhfi7dxpu/image/upload/v1609387460/owner/nwoxqgneq11hhfhotus9.jpg","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T19:04:22.377Z","updateAt":"2020-12-30T19:04:22.377Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":6,"title":"김고은, 드라마 '유미의 세포들' 유미 된다","content":"(서울=연합뉴스) 이정현 기자 = 드라마 제작사 스튜디오드래곤은 인기 네이버웹툰을 원작으로 하는 드라마 '유미의 세포들' 여주인공 유미 역에 배우 김고은이 캐스팅됐다고 31일 밝혔다.\n\n누적 조회 수 32억뷰를 기록한 이동건 작가의 '유미의 세포들'은 30대 평범한 직장인 유미의 이야기를 유미 머릿속 세포들의 시각으로 표현한 작품으로, 지난 11월 5년여간의 연재를 마무리했다.\n\n김고은은 감정 표현이 서툰 평범한 여성이지만 사랑과 일을 통해 성장하며 일상의 소소한 행복을 찾아가는 유미로 변신한다.\n\n그는 \"보통 여자 유미의 사랑 이야기가 오랫동안 많은 이들을 울고 웃게 할 수 있었던 건 '공감'의 힘 아니었을까 싶다, 앞으로의 여정이 기대된다\"고 말했다.\n\n\n한편, 드라마 '유미의 세포들'은 유미의 의식의 흐름을 관장하는 수많은 '세포'들의 활약이 중요하기에 웹툰의 재미를 200% 끌어올리고자 실사와 애니메이션을 결합하는 방식으로 제작된다.\n\n극본은 '알함브라 궁전의 추억' 등의 송재정 작가와 '그 남자의 기억법'의 김윤주 작가, 신인 김경란 작가가 집필한다. 연출은 '아는 와이프' 등의 이상엽 PD가 맡는다.\n\n내년 상반기 촬영에 돌입할 예정이다. 편성은 미정.","group":"자유","photos":"https://res.cloudinary.com/dhfi7dxpu/image/upload/v1609387379/owner/u95zyfyauvzwmmg0mhlq.jpg","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T19:03:02.090Z","updateAt":"2020-12-30T19:03:02.090Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":5,"title":"소상공인·자영업자 지원대책","content":"1. 지원대책 왜 필요한가?\n2018년 10월 기준 국내 자영업자 수는 약570만 명이다. 자영업자 수(’02,621→’18.10,567만명)와 비중(’02,27.9→’18.10,20.9%)은 감소 추세이나 주요 선진국에 비해 크게 높은 수준이다.\n\nhttps://www.korea.kr/special/policyCurationView.do?newsId=148856781","group":"정부지원","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T18:55:12.969Z","updateAt":"2020-12-30T18:55:12.969Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":4,"title":"매출 직격탄·폐업 속출…속타는 자영업자·소상공인","content":"【 앵커멘트 】\n수도권 거리두기 2.5단계 운영기간이 연장되면서 자영업자와 소상공인의 걱정은 더 깊어졌습니다.\n\n경제적 타격을 감내해야 하는 기간도 함께 늘어났기 때문입니다.\n\n특히 일부 상권은 피해가 더 심각한데, 문숙희 기자가 상인들의 목소리를 들어봤습니다.\n\n【 기자 】\n서울 성북구 장위전통시장, 거리가 한산합니다.\n\n사랑제일교회와 가까운 이 시장은 이 교회발 확진자가 발생한 지난 달 중순부터 손님들의 발길이 뚝 끊겼습니다.\n\n매출은 곤두박질쳤습니다.\n\n【 인터뷰 】 김문태 / 장위시장 상인\n\"사랑제일교회 때문에 타격이 당연히 많죠. 매출이 (기존의) 30%도 안되고 있다고요. 힘든 정도가 아니죠. 집세도 저번 달엔 못 내고.\"\n\n이태원 상권도 외국인 관광객이 확 줄고 클럽발 집단감염 사례까지 발생하면서, 몇 달째 매출 하락이 이어지고 있습니다.\n\n더 이상 버티기가 힘들어 폐업한 가게들도 크게 증가했습니다.\n\n【 스탠딩 】 이태원 상권의 상징과 같은 홍석천 씨의 식당도 경영난에 못 이겨 결국 지난주 완전히 문을 닫았습니다.\n\n【 인터뷰 】 김문정 / 이태원 상인\n\"비행기 길이 막혀 버리니까 직격탄 맞은 거죠. 음식점은 이태원 클럽발 확진 때문에 완전히 100% 타격 받았어요. 임대료 감당이 안되고 할 수 없는 상황이기 때문에 (저도) 폐업을 결정했어요.\"\n\n대학들이 1학기에 이어 2학기까지 비대면 수업을 진행하면서 대학가 상권들 역시 어려운 건 마찬가지입니다.\n\n수도권 거리두기가 2.5단계로 격상된 이후 경제적 타격이 더 커졌는데, 이를 일주일 더 연장한다는 소식에 우려가 앞섭니다.\n\n【 인터뷰 】 김수진 / 신촌 상인\n\"(코로나19 이후에) 30% 정도 줄었다고 하면 2.5단계 시작하면서 50~60%는 더 줄은 것 같아요. 특히 매장 안에 못 앉으니까. 2.5단계가 유지되면서 인건비라든가 임대료 내는 게 저한테는 더 부담이 돼서 걱정이 더 커질 것 같아요.\"\n\n정부가 자영업자와 소상공인을 대상으로 2차 재난지원금을 지급하면 일시적으로 도움은 되겠지만 코로나 타격이 언제까지 이어질지 모르는 상황에서 상인들의 속은 타들어가고 있습니다.\n\nTBS 문숙희입니다.","group":"요식업","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T18:53:39.950Z","updateAt":"2020-12-30T18:53:39.950Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":3,"title":"빚내서 버티는 자영업자… 대출 755조 넘어","content":"신종 코로나바이러스 감염증(코로나19) 사태로 빚내서 버티는 자영업자가 늘고 있다. 자영업자 대출은 석 달 만에 50조 원 넘게 불어나 750조 원을 넘었다. 대출자 수도 8년 만에 최대 규모로 늘었다.\n\n15일 국회 기획재정위원회 소속 정의당 장혜영 의원이 한국은행에서 받은 자료에 따르면 올 6월 말 현재 자영업자 대출 잔액은 755조1000억 원으로 집계됐다. 이는 지난해 말(684조9000억 원)보다 70조2000억 원 늘어난 규모다. 증가율은 10.25%로 지난해 연간 증가율(9.7%)을 웃돈다.\n\n자영업자 대출 잔액은 코로나19가 확산된 3월 말 700조 원으로 불어났다. 2012년 통계 작성 이후 처음으로 700조 원을 돌파한 데 이어 3개월 만에 55조1000억 원이 급증한 것이다.\n\n대출자 수도 지난해 1년간 늘어난 숫자를 이미 넘어섰다. 6월 말 대출자는 229만6000명으로 지난해 말(191만4000명)보다 38만2000명 증가했다. 지난해 늘어난 전체 대출자(14만4000명)의 2.5배가 넘는 증가 폭이다. 대출자 수도 통계 작성 이후 8년 만에 가장 많다. 한은 관계자는 “코로나19 사태로 어려움을 겪는 자영업자들이 대출을 많이 받았기 때문”이라며 “3분기(7∼9월)에도 전년 동기 대비 높은 대출 증가세가 이어질 것으로 보인다”고 말했다.","group":"요식업","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T18:52:30.640Z","updateAt":"2020-12-30T18:52:30.640Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":2,"title":"자영업자들 줄줄이 휴업…\"폐업해도 빚더미\"","content":"자영업자들 줄줄이 휴업…\"폐업해도 빚더미\"\n\n[앵커]\n\n수도권의 사회적 거리두기 2.5단계가 13일까지 연장되면서 소상공인들의 시름이 커지고 있습니다.\n\n곳곳에 휴업 안내문이 붙었고 폐업을 고민하는 사람들도 늘고 있는데요.\n\n폐업을 하려해도 소상공인들의 고민은 끝나지 않습니다.\n\n이동훈 기자입니다.\n\n[기자]\n\n사람 많기로 이름난 서울의 홍대 거리.\n\n하지만 평일 낮인데도 휴업 안내문을 내걸고 문을 닫은 상점들이 곳곳에 보입니다.\n\n코로나19 탓에 매출이 급감해 열수록 손해를 보자 상인들이 자진 휴업을 한 겁니다.\n\n문을 연 곳도 손님은 좀처럼 오지 않습니다.\n\n특히 저녁 손님이 전부인 주점들의 타격이 큽니다.","group":"요식업","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T18:51:56.125Z","updateAt":"2020-12-30T18:51:56.125Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}},{"id":1,"title":"힘겨운 자영업자들 \"이럴바엔 차라리 3단계로\"","content":"힘겨운 자영업자들 \"이럴바엔 차라리 3단계로\"\n[뉴스리뷰]\n\n[앵커]\n\n거리두기 격상에도 코로나 확진 기세가 좀처럼 꺾일 기세를 보이지 않으면서, 가뜩이나 장사가 힘들어진 자영업자들은 더 울상입니다.\n\n확산 속도를 빠르게 잡기 위해 결단을 내려달라는 목소리까지 나오는데요.\n\n박상률 기자입니다.\n\n[기자]\n\n서울의 하루 확진자 수는 12일째 200명을 넘어섰습니다.\n\n역대 최다였던 지난 12일보다는 줄었는데, 검사 건수가 상대적으로 적었던 주말이라는 점을 감안하면 확산세는 여전합니다.\n\n거리두기 단계 격상을 두고 서울시는 물론, 정부는 신중한 입장입니다.\n\n<박유미 / 서울시 시민건강국장> \"지금이 사회적 거리두기 단계를 더 격상하지 않고, 코로나19 폭증세를 꺾을 수 있는 마지막 기회일 수도 있습니다.\"\n\n거리두기 3단계가 되면 문을 닫아야 하는 시설만 50만 개 이상으로 늘어 자영업자와 소상공인은 벼랑 끝에 몰리게 됩니다.\n\n<자영업자 A씨> \"매출이 거의 50% 이상 줄어들었거든요. 고정비용은 변함이 없죠. 인건비부터 임대료, 굳이 여기서 경비를 줄이려고 한다면 사람을 줄이는 방법밖에\"\n이미 한계에 내몰린 업주들 사이에선 \"차라리 3단계로 올리자\"는 목소리까지 나옵니다.\n\n<자영업자 B씨> \"지금도 이미 개점 휴업 상태나 마찬가지입니다. 인원 제한이 중요하겠어요? 사람들이 나오지를 않는데요. 어차피 이렇게 된 거 그냥 빨리 3단계 시행하고 (코로나 사태를) 벗어나는 게 낫겠다는 심정입니다. 이 동네 주인들 다 이제 한계라는 분위기예요.\"\n\n올 상반기 코로나19 여파로 PC방이나 노래방, 이발소 등의 업종은 폐업 건수가 개업 건수에 비해 서너 배 많은 것으로 나타났습니다.\n\n자영업자들의 줄폐업이 이어지는 상황에서 연말 특수마저 누리기 힘들어진 업주들의 한숨은 더 커지고 있습니다.\n\n연합뉴스TV 박상률입니다. (srpark@yna.co.kr)\n\n연합뉴스TV 기사문의 및 제보 : 카톡/라인 jebo23","group":"요식업","photos":"","commentCount":0,"emotionCount":0,"isDelete":false,"createAt":"2020-12-30T18:20:41.923Z","updateAt":"2020-12-30T18:20:41.923Z","author":{"profileImage":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_640x640.jpg","description":null,"code":"phupdv3yb","thumbnail":"http://k.kakaocdn.net/dn/dbGd6g/btqOdo0B8fk/CRaZvA3NZ6lfb6FxZrwDi1/img_110x110.jpg","name":"실버","email":"ttl7917516@naver.com","group":"주점"}}]

