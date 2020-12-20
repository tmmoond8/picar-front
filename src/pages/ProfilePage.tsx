/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Icon, { IconKey } from '../components/Icon';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';
import Profile from '../components/Profile';
import Button from '../components/Button';
import { colors } from '../styles';

const menus = [
  { menu: '게시글', path: '/', icon: 'article' },
  { menu: '댓글', path: '/', icon: 'chatOutline' },
  { menu: '북마크', path: '/', icon: 'bookmarkOutline' },
];

export default observer(function ProfilePage(): JSX.Element {
  const {
    user: { profile },
    ui,
  } = useStore();
  ui.setHeaderNone();
  const { profileImage, name, group, description } = profile;
  console.log(profile);

  return (
    <Page>
      <Header>
        <h2>dosannan.222</h2>
        <Icon icon="more" size="24px" color={colors.black22} />
      </Header>
      <Profile.Profile
        name={name}
        group={group}
        profileImage={profileImage}
        description={description}
      />
      <ProfileModifyButton onClick={() => {}}>프로필 수정</ProfileModifyButton>
      <HR height={1} color={colors.blackF5F6F7} marginTop={26} />
      <UserHistoryMenus>
        {menus.map(({ menu, icon }) => (
          <UserHistoryMenu>
            <Icon icon={icon as IconKey} size="36px" />
            <span>{menu}</span>
          </UserHistoryMenu>
        ))}
      </UserHistoryMenus>
      <HR height={1} color={colors.blackF5F6F7} />
      <AppMenus>
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
      </AppMenus>
      <MenuBar />
    </Page>
  );
});

const Page = styled.div`
  padding: 20px 18px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.black22};
  }

  svg {
    justify-self: flex-end;
  }
`;

const ProfileModifyButton = styled(Button)`
  width: 100%;
  height: 48px;
  margin: 26px 0 0 0;
  background-color: ${colors.blackF5F6F7};
  border-radius: 8px;
  border: none;
  span {
    margin: 0 auto;
    font-size: 15px;
    line-height: 24px;
    color: ${colors.black22};
    font-weight: 600;
  }
`;

const UserHistoryMenus = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 96px;
`;

const UserHistoryMenu = styled.li`
  text-align: center;

  svg {
    color: ${colors.black66};
    margin: 0 auto;
  }
  span {
    margin-top: 4px;
    font-size: 14px;
  }
`;

const AppMenus = styled.ul`
  margin: 28px 0 0 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    cursor: pointer;
    .icon {
      cursor: pointer;
    }
  }
`;
