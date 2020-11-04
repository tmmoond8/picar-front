/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Icon, { IconKey } from '../components/Icon';
import Profile from '../components/Profile';
import HR from '../components/HR';
import MenuBar from '../components/MenuBar';
import { useStore, observer } from '../stores';
import { colors } from '../styles';

const Page = styled.div``;

const UserProfile = styled.div`
  height: 209px;
  text-align: center;
  .profilePhoto {
    display: inline-block;
    margin-top: 48px;
  }
  .name {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 500;
  }
  .group {
    margin-top: 2px;
    font-size: 14px;
  }
`;

const Menus = styled.ul`
  display: grid;
  height: 214px;
  width: 232px;
  grid-template-rows: 57px 57px;
  grid-template-columns: repeat(3, minmax(max-content, 60px));
  justify-content: space-between;
  row-gap: 31px;
  margin: 0 auto;
  padding: 37px 0;
`;

const Menu = styled.li`
  text-align: center;
  svg {
    margin: 0 auto;
  }
  span {
    margin-top: 4px;
    font-size: 14px;
  }
`;

const menus = [
  { menu: '게시글', path: '/', icon: 'customerCenter' },
  { menu: '댓글', path: '/', icon: 'customerCenter' },
  { menu: '북마크', path: '/', icon: 'customerCenter' },
  { menu: '공지', path: '/', icon: 'customerCenter' },
  { menu: '고객센터', path: '/', icon: 'customerCenter' },
  { menu: '설정', path: '/', icon: 'customerCenter' },
];

export default observer(function ProfilePage(): JSX.Element {
  const {
    user: { profile },
    ui,
  } = useStore();
  ui.setHeaderNone();
  const { profileImage, name, group } = profile;

  return (
    <Page>
      <UserProfile>
        <Profile.Photo className="profilePhoto" src={profileImage} size={96} />
        <h2 className="name">{name}</h2>
        <h4 className="group">{group}</h4>
      </UserProfile>
      <Menus>
        {menus.map(({ menu, icon }) => (
          <Menu>
            <Icon icon={icon as IconKey} size="32px" />
            <span>{menu}</span>
          </Menu>
        ))}
      </Menus>
      <HR height={6} color={colors.blackF5F6F7} />
      <MenuBar />
    </Page>
  );
});
