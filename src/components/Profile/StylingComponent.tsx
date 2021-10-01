import styled from '@emotion/styled';

import { colors } from '../../styles';

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
