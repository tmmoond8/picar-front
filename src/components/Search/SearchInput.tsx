/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

import Icon from '../Icon';
import Input from '../Input';

const SearchInput: React.FC<{ 
  search: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear: () => void;
  isOnSearch: boolean;
  setIsOnSearch: (v: boolean) => void;
}> = ({ search, onChangeSearch, setIsOnSearch, onClear, isOnSearch }) => {
  
  return (
    <Wrapper>
      {isOnSearch && <Icon icon="back" size="24px" color={colors.black22} onClick={() => setIsOnSearch(false)}/>}
      <InputBox>
        <Icon icon="search" size="20px" color={colors.blackCC}/>
        <TextField 
          id="searchText"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={onChangeSearch}
          onFocus={() => setIsOnSearch(true)}
        />
      </InputBox>
    </Wrapper>
  )
}

export default SearchInput;

const Wrapper = styled.div`
    display: flex;
    height: 60px;
    min-height: 60px;
    padding: 10px 18px;

    .icon.back {
      position: relative;
      left: -4px;
    }
`;

const InputBox = styled.div`
    display: flex;
    flex: 1;
    margin: 0 0 0 8px;
    padding: 8px 12px;
    border-radius: 12px;
    background-color: ${colors.blackEB};
`;

const TextField = styled(Input.TextField )`
  flex: 1;
  margin: 0 0 0 5px;
  padding: 0;

  .Field {
    width: 100%;
    height: 100%;
    margin: 0;
    border-bottom: none;
    input#searchText {
      background-color: ${colors.transparent};
      font-size: 16px;
    }
  }
`