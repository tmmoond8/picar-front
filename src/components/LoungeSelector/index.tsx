/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import cx from 'classnames';

import { colors } from '../../styles';
import Icon, { IconKey } from '../Icon';
import { NAVIGATIONS, LOUNGES, LOUNGE, Lounge as LoungeKeys } from '../../types/constants';
import { useBottomSheet } from '../BottomSheet';

const lounges = [
  ...NAVIGATIONS.filter((navigation) => navigation.name !== LOUNGE).map(
    (navigation) => navigation.name,
  ),
  ...LOUNGES.map((lounge) => lounge.name),
];

const LoungeSelector: React.FC<{
  selected: string;
  setSelected: (value: string) => void;
}> = ({
  selected, setSelected
}) => {
  const bottomSheet = useBottomSheet();
  const handleSelect = React.useCallback((value: string) => {
    bottomSheet.close();
    setSelected(value);
  }, [setSelected, bottomSheet])

  const handleOpenSelects = React.useCallback(() => {
    bottomSheet.open({
      title: '라운지 선택',
      contents: (
        <LoungeList handleSelect={handleSelect}/>
      ),
      isFull: true,
      hasTitleLine: false,
    })
  }, [bottomSheet])

  return (
    <StyledSelector onClick={handleOpenSelects}>
      {selected}
      <Icon icon="arrowDown" color={colors.black22} size="16px"/>
    </StyledSelector>
  )
}

export default LoungeSelector;

export const LoungeList: React.FC<{
  handleSelect: (value: string) => void
}> = ({ handleSelect }) => {

  return (
    <List>
      <Lounge lounge="업종라운지" icon="add" disabled/>
      {NAVIGATIONS.map(({ name }) => (
        name === LOUNGE ? (
          LOUNGES.map(({ name }) => (
            <Lounge key={name} lounge={name} icon="arrowRight" isSubMenu onClick={() => handleSelect(name)}/>
          ))
        ) :
        <Lounge key={name} lounge={name} icon="arrowRight" onClick={() => handleSelect(name)}/>
      ))}
    </List>
  )
}

const StyledSelector = styled.button`
  min-width: 100px;
  padding: 8px 12px 9px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black77};
  border-radius: 8px;
  background-color: ${colors.blackD9};
  cursor: pointer;

  .icon.arrowDown {
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const List = styled.ol`
  overflow-y: scroll;
  font-size: 17px;
  color: ${colors.black22};

  li {
    display: flex;
    justify-content: space-between;
    padding: 13px 15px 14px 18px;
    cursor: pointer;
  }

  .subMenu {
    background-color: ${colors.blackF5F6F7};
    padding-left: 36px;
  }

  .disabled {
    cursor: auto;
  }
`;

const Lounge: React.FC<{ 
  lounge: string;
  icon: IconKey;
  isSubMenu?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({
  lounge, icon, onClick = () => {}, isSubMenu = false, disabled = false
}) => {
  return (
    <li onClick={onClick} className={cx(disabled ? 'disabled' : '', isSubMenu ? 'subMenu' : '')}>
      {lounge}
      <Icon icon={icon} size="16px" color={colors.blackBF}/>
    </li>
  )
}

export const useSelector = (defaultValue?: string) => {
  return React.useState<string>(() =>
    lounges.length > 0 ? defaultValue || lounges[0] : '',
  );
};
