/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { colors } from '../../styles';
import Icon, { IconKey } from '../Icon';
import AllLoungeListComponent from './AllLoungeList';
import { LOUNGES, Models } from '../../types/constants';
import { useModal } from '../Modal';

const lounges = Models.map(({ name }) => name);

const LoungeSelector: React.FC<{
  className?: string;
  selected: string;
  setSelected: (value: string) => void;
  label?: string;
  all?: boolean;
  myLounge?: string;
}> = ({
  selected, setSelected, className, label, all = false, myLounge,
}) => {
    const modal = useModal();
    const handleSelect = React.useCallback((value: string) => {
      modal.close();
      setSelected(value);
    }, [setSelected, modal])

    const handleOpenSelects = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      modal.open({
        title: '라운지 선택',
        contents: (
          <React.Fragment>
            {all && <AllLoungeListComponent handleSelect={handleSelect} myLounge={myLounge} />}
            {!all && <LoungeList handleSelect={handleSelect} myLounge={myLounge} />}
          </React.Fragment>
        ),
        isFull: true,
        hasTitleLine: false,
      })
    }, [modal])

    return (
      <Box className={cx('SelectBox', className)}>
        {label && <Label>{label}</Label>}
        <StyledSelector className={'Selector'} onClick={handleOpenSelects}>
          {selected}
          <Icon icon="arrowDown" color={colors.black22} size="16px" />
        </StyledSelector>
      </Box>

    )
  }

export default LoungeSelector;

export const AllLoungeList = AllLoungeListComponent;

export const LoungeList: React.FC<{
  handleSelect: (value: string) => void
  myLounge?: string;
}> = ({ handleSelect, myLounge }) => {

  return (
    <List>
      {LOUNGES.map(({ name }) => (
        <Lounge
          key={name}
          lounge={name}
          icon="arrowRight"
          onClick={() => handleSelect(name)}
          isMyLounge={myLounge === name}
        />
      ))}
    </List>
  )
}

const Box = styled.div``;

const Label = styled.p`
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  color: ${colors.black77};
  opacity: 0.99;
`;

const StyledSelector = styled.button`
  display: block;
  min-width: 100px;
  padding: 8px 12px 9px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black77};
  border-radius: 8px;
  background-color: ${colors.blackD9};
  cursor: pointer;

  .Icon.arrowDown {
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const List = styled.ol`
  overflow-y: auto;
  font-size: 17px;
  color: ${colors.black22};

  .Lounge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 15px 14px 18px;
    cursor: pointer;

    .Name {
      display: flex;
      align-items: center;
    }

    .Badge { 
      height: 16px;
      line-height: 13px;
      margin: 0 0 0 12px;
      padding: 0 5px;
      border-radius: 2px;
      font-size: 10px;
      font-weight: 500;
      background-color: ${colors.black22};
      color: ${colors.blackF7};
    }
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
  isMyLounge?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({
  lounge, icon, onClick = () => { }, isSubMenu = false, disabled = false, isMyLounge = false,
}) => {
    return (
      <li
        onClick={onClick}
        className={cx('Lounge', disabled ? 'disabled' : '', isSubMenu ? 'subMenu' : '')}>
        <p className="Name">{lounge}{isMyLounge && <span className="Badge">my</span>}</p>
        <Icon icon={icon} size="16px" color={colors.blackBF} />
      </li>
    )
  }

export const useSelector = (defaultValue?: string) => {
  return React.useState<string>(() =>
    lounges.length > 0 ? defaultValue || lounges[0] : '',
  );
};
