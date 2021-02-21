/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation  } from 'react-router';
import { useStore, observer } from '../../stores';
import SearchInput from '../Search/SearchInput';
import { colors } from '../../styles';
import { useTextField } from '../Input/hooks';


const Search: React.FC = () => {
  const { util } = useStore();
  const { state } = useLocation();
  const [ search, onChangeSearch ] = useTextField('');

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.keyCode === 13 && search.length > 0) {
      util.history.push('/search', { search })
    }
  }, [search])

  React.useEffect(() => {
    if (state && 'search' in state) {
      onChangeSearch({ target: { value: (state as any).search}} as any)
    }
  }, [])

  return (
    <StyledSearch 
      search={search} 
      onChangeSearch={onChangeSearch} 
      placeholder="찾고싶은 주제 혹은 닉네임을 입력하세요"
      onKeyDown={handleKeyDown}
    />
  )
}

export default observer(Search);

const StyledSearch = styled(SearchInput)`
  display: flex;
  align-items: center;
  flex: 1;
  height: 44px;
  margin: 0 20px 0 24px;
  padding: 0;

  .SearchInput {
    height: 44px;
    margin: 0;
    padding: 10px 16px;
    background-color: ${colors.transparent};
    border: solid 1px ${colors.blackBF};
    border-radius: 22px;
  }

  &.focus {
    .SearchInput {
      border: solid 1px ${colors.black22};
    }
  }
`
