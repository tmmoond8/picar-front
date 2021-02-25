/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';

import Icon from '../Icon';
import Input from '../Input';

const SearchInput: React.FC<{ 
  search: string;
  placeholder?: string;
  className?: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  isOnSearch?: boolean;
  setIsOnSearch?: (v: boolean) => void;
}> = ({ 
    className, 
    search, 
    onChangeSearch, 
    setIsOnSearch = () => {}, 
    onClear = () => {}, 
    onKeyDown = () => {},
    isOnSearch, 
    placeholder="검색어를 입력하세요" 
}) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <Wrapper className={cx('SearchInputWrapper', className, focus ? 'focus' : null)}>
      {isOnSearch && <Icon icon="back" size="24px" color={colors.black22} onClick={() => {
        setIsOnSearch(false);
        onClear();
      }}/>}
      <InputBox className="SearchInput">
        <Icon icon="search" size="20px" color={colors.blackCC}/>
        <TextField 
          id="searchText"
          placeholder={placeholder}
          value={search}
          onChange={onChangeSearch}
          onFocus={() => {
            setIsOnSearch(true)
            setFocus(true);
          }}
          onKeyDown={onKeyDown}
          onBlur={() => setFocus(false)}
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
    background-color: ${colors.white};

    .Icon.back {
      position: relative;
      left: -4px;
      margin: 0 8px 0 0;
    }
`;

const InputBox = styled.div`
    display: flex;
    flex: 1;
    padding: 8px 12px;
    border-radius: 12px;
    background-color: ${colors.blackF5F6F7};
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