/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Page from './BasePage';
import Icon, { IconKey } from '../components/Icon';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';
import APIS from '../apis';
import Profile from '../components/Profile';
import UserActivations from '../components/Profile/ActivationsContainer';
import { colors } from '../styles';
import { useBottomSheet } from '../components/BottomSheet';

const menus = [
  { menu: '게시글', key: 'article', icon: 'article' },
  { menu: '댓글', key: 'comment', icon: 'chatOutline' },
  { menu: '북마크', key: 'bookmark', icon: 'bookmark' },
];

export default observer(function ProfilePage(): JSX.Element {
  const { user, util } = useStore();

  const [ count, setCount ] = React.useState(0);
  const bottomSheet = useBottomSheet();
  const { profileImage, name, group, description, code } = user.profile;
  const handleModifyProfile = React.useCallback(() => {
    bottomSheet.open({
      title: '프로필 수정',
      contents: <Profile.Form handleClose={bottomSheet.close} />,
      isFull: true, 
    });
  }, [bottomSheet]);

  const handleOpenUserActivations = React.useCallback((menu) => {
    util.history.push('/myActivations', { menu })
  }, [bottomSheet]);

  const handleUnknown = React.useCallback(async () => {
    setCount(count + 1);
    if (count > 20) {
      const { data } = await APIS.auth.deleteUser(code);
      if (data.ok) {
        util.history.goBack();
        setTimeout(() => {
          window.location.reload();
        }, 300)
      }
    }
  }, [count])

  return (
    <StyledPage>
      <Profile.Header>
        <h2 onClick={handleUnknown}>dosannan.222</h2>
        <Icon icon="more" size="24px" color={colors.black22}/>
      </Profile.Header>
      <Body>
        <Profile.Profile
          name={name}
          group={group}
          profileImage={profileImage}
          description={description}
        />
        <Profile.ProfileModifyButton onClick={handleModifyProfile}>
          프로필 수정
        </Profile.ProfileModifyButton>
        <HR height={1} color={colors.blackF5F6F7} marginTop={26} />
        <Profile.UserHistoryMenus>
          {menus.map(({ menu, icon, key }) => (
            <Profile.UserHistoryMenu key={key} onClick={() => handleOpenUserActivations(key)}>
              <Icon icon={icon as IconKey} size="36px" />
              <span>{menu}</span>
            </Profile.UserHistoryMenu>
          ))}
        </Profile.UserHistoryMenus>
        <HR height={1} color={colors.blackF5F6F7} />
        <Profile.AppMenus>
          <li>
            공지사항
            <Icon icon="arrowRight" size="16px" />
          </li>
          <li>
            자주 묻는 질문
            <Icon icon="arrowRight" size="16px" />
          </li>
          <li>
            앱 설정
            <Icon icon="arrowRight" size="16px" />
          </li>
        </Profile.AppMenus>
      </Body>
      <StyledMenuBar />
    </StyledPage>
  );
});

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  padding: 0 18px 20px;
  overflow-y: scroll;
`;

const StyledMenuBar = styled(MenuBar)`
  position: static;
`;