/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { colors } from '../../styles';

import Icon from '../Icon';
import MenuItem from './MenuItem';

export default function MenuBar(): JSX.Element {
  const history = useHistory();
  const handleClickCommunity = () => {
    console.log('커뮤니티');
  };
  const handleClickSearch = () => {
    console.log('검색');
  };
  const handleClickWrite = () => {
    history.push('/article/write');
  };
  const handleClickMarket = () => {
    console.log('장터');
  };
  const handleClickProfile = () => {
    console.log('프로필');
  };

  return (
    <MenuBarContainer>
      <ul>
        <MenuItem
          icon={<Icon icon="chat" size="24px" color={colors.black33} />}
          name="커뮤니티"
          onClick={handleClickCommunity}
        />
        <MenuItem
          icon={<Icon icon="search" size="24px" color={colors.black33} />}
          name="검색"
          onClick={handleClickSearch}
        />
        <MenuItem
          icon={<Icon icon="edit" size="24px" color={colors.black33} />}
          name="글쓰기"
          onClick={handleClickWrite}
        />
        <MenuItem
          icon={<Icon icon="package" size="24px" color={colors.black33} />}
          name="장터"
          onClick={handleClickMarket}
        />
        <MenuItem
          icon={<Icon icon="user" size="24px" color={colors.black33} />}
          name="프로필"
          onClick={handleClickProfile}
        />
      </ul>
    </MenuBarContainer>
  );
}

const MenuBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
`;
