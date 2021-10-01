import styled from '@emotion/styled';
import { colors } from '../../styles';
import Button from '../Button';
import BasePage from '../../pages/BasePage';

export const Page = styled(BasePage)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .PopularArticleList {
    flex: 1;
  }
`;

export const Title = styled.h2`
  position: relative;
  padding: 18px 18px 0 18px;
  color: ${colors.black22};
  font-weight: bold;
  background-color: ${colors.white};
`;

export const ShadowTitle = styled(Title)`
  background-color: ${colors.white};
`;

export const RemoveRecentSearchs = styled(Button)`
  border: none;
  padding: 18px 20px 0 0;
  font-size: 14px;
  & > span {
    color: ${colors.primary};
  }
`;

export const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;
