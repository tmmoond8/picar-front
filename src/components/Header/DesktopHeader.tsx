/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useStore, observer } from '../../stores';
import { useHistory } from 'react-router-dom';
import Logo from '../Logo';
import SearchInput from '../Search/SearchInput';
import { useTextField } from '../Input/hooks';

import { colors } from '../../styles';
import Icon from '../Icon';

const DesktopHeader: React.FC<{
  
}> = () => {
  const { ui } = useStore();
  const history = useHistory();
  const [ search, onChangeSearch ] = useTextField('');

  return (
    <Header>
      <Logo color={colors.black40}/>
      <Search 
        search={search} 
        onChangeSearch={onChangeSearch} 
        placeholder="찾고싶은 주제 혹은 닉네임을 입력하세요"
      />
      <div>userBox</div>
    </Header>
  );
}

export default observer(DesktopHeader);

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 10px 60px 10px 60px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`

const Search = styled(SearchInput)`
  display: flex;
  align-items: center;
  width: 360px;
  height: 44px;
  padding: 0;

  .SearchInput {
    height: 44px;
    margin: 0;
    padding: 10px 16px;
    background-color: ${colors.transparent};
    border: solid 1px ${colors.blackBF};
    border-radius: 8px;
  }

  &.focus {
    .SearchInput {
      border: solid 1px ${colors.black22};
    }
  }
  
`;