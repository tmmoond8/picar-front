/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Page from './BasePage';
import Icon, { IconKey } from '../components/Icon';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';

import Profile from '../components/Profile';
import { CAROUSEL } from '../types/constants';
import { colors } from '../styles';
import ActivationsContainer from '../components/Profile/ActivationsContainer';

const menus = [
  { menu: '게시글', key: 'article', icon: 'article' },
  { menu: '댓글', key: 'comment', icon: 'chatOutline' },
  { menu: '북마크', key: 'bookmark', icon: 'bookmark' },
];

const Mobile = () => {
  const { user, util } = useStore();
  const { profileImage, name, group, description, code } = user.profile;
  const { handleOpenUserActivations } = useProfileHandler();
  React.useEffect(() => {
    if (!user.isLogined) {
      util.history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Profile.Header />
      <BodyContainer>
        <Body>
          <Profile.Profile
            name={name}
            group={group}
            profileImage={profileImage}
            description={description}
            code={code}
            canEdit
          />
          <HR height={1} color={colors.blackF5F6F7} marginTop={12} />
          <Profile.UserHistoryMenus>
            {menus.map(({ menu, icon, key }) => (
              <Profile.UserHistoryMenu
                key={key}
                onClick={() => handleOpenUserActivations(key)}
              >
                <Icon icon={icon as IconKey} size="36px" />
                <span>{menu}</span>
              </Profile.UserHistoryMenu>
            ))}
          </Profile.UserHistoryMenus>
          <HR height={1} color={colors.blackF5F6F7} />
          {/* <Profile.AppMenus>
            <li onClick={() => window.open('https://bit.ly/3clTlMq', '_blank')}>
              공지사항
              <Icon icon="arrowRight" size="16px" />
            </li>
            <li onClick={() => window.open('https://bit.ly/3ilnfEp', '_blank')}>
              자주 묻는 질문
              <Icon icon="arrowRight" size="16px" />
            </li>
          </Profile.AppMenus> */}
        </Body>
      </BodyContainer>
      <MenuBar />
    </React.Fragment>
  );
};

const Tablet = () => {
  const { user, ui } = useStore();
  const { profileImage, name, group, description, code } = user.profile;
  ui.scrollableElementSelector = '.MyProfileWrapper';

  return (
    <TabletWrapper className="MyProfileWrapper">
      <Profile.Header />
      <Body className="MyProfileBody">
        <Profile.Profile
          name={name}
          group={group}
          profileImage={profileImage}
          description={description}
          code={code}
          canEdit
        />
      </Body>
      <Activations
        userCode={user.profile.code}
        tab={'article'}
        onChange={() => {}}
      />
    </TabletWrapper>
  );
};

export default observer(() => {
  const { ui } = useStore();

  return (
    <StyledPage>
      {ui.queryMatch.Mobile && <Mobile />}
      {(ui.queryMatch.Tablet || ui.queryMatch.Desktop) && <Tablet />}
    </StyledPage>
  );
});

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  padding: 0 18px 20px;
  overflow-y: auto;
  background-color: ${colors.white};
`;

const BodyContainer = styled.div`
  flex: 1;
  background: ${colors.white};
`;

const TabletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  .TabletBody {
    overflow-y: visible;
  }

  .eg-flick-camera > * {
    overflow-y: visible;
    .ArticleCard,
    .Comment {
      margin-top: 1px;
      box-shadow: 0 -1px #f5f6f7;
    }
  }
`;

const Activations = styled(ActivationsContainer)`
  flex: 1;
  .Tabs {
    height: 56px;
    .TabItem {
      flex: none;
      line-height: 56px;
      padding: 0 6px;
    }
    .TabItem + .TabItem {
      margin-left: 20px;
    }
  }

  #${CAROUSEL.PROFILE} {
    overflow: auto;
    height: auto;
    > div {
      height: 100%;
      .eg-flick-panel {
        height: 100%;
      }
    }
    .eg-flick-camera,
    .eg-flick-viewport {
      height: 100% !important;
    }
  }

  .ProfileCommentList {
    padding-bottom: 24px;
    li {
      background-color: ${colors.white};
      .CenterContainer {
        height: calc(100% - 24px);
      }
    }
  }

  .ArticleList,
  .ProfileCommentList {
    overflow-y: auto;
  }
`;

function useProfileHandler() {
  const { util } = useStore();

  const handleModifyProfile = React.useCallback(() => {
    util.history.push('/myProfile/edit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenUserActivations = React.useCallback(
    (menu) => {
      util.history.push('/myActivations', { menu });
    },
    [util],
  );

  return {
    handleModifyProfile,
    handleOpenUserActivations,
  };
}
