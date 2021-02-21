import styled from '@emotion/styled';
import { colors } from '../../styles';
import Button from '../Button';
import MenuBarComponent from '../MenuBar';
import BasePage from '../../pages/BasePage';

export const Page = styled(BasePage)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.white};

  .PopularArticleList {
    flex: 1;
    overflow-y: auto;
  }
`;

export const Title = styled.h2`
position: relative;
padding: 18px 18px 0 18px;
color: ${colors.black22};
font-weight: bold;
`;

export const ShadowTitle = styled(Title)`
  background-color: ${colors.white};
  &:after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.1),  rgba(255, 255, 255, 0.9));
  }
`;

export const RemoveRecentSearchs = styled(Button)`
  border: none;
  padding: 18px 20px 0 0;
  font-size: 14px;
  & > span {
    color: ${colors.primary};
  }
`;

export const MenuBar = styled(MenuBarComponent)`
  position: static;
  top: none;
  left: none;
  right: none;
  bottom: none;
`;