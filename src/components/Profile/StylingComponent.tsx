/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Button from '../Button';
import { colors } from '../../styles';


export const ProfileModifyButton = styled(Button)`
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

export const UserHistoryMenus = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 96px;
`;

export const UserHistoryMenu = styled.li`
  text-align: center;
  cursor: pointer;

  svg {
    margin: 0 auto;
    color: ${colors.black66};
    cursor: pointer;
  }
  svg g {
    fill: transparent;
  }
  span {
    margin-top: 4px;
    font-size: 14px;
  }
`;

export const AppMenus = styled.ul`
  margin: 28px 0 0 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    cursor: pointer;
    .Icon {
      cursor: pointer;
    }
  }
`;
