/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { colors } from '../../styles';
import Icon, { IconKey } from '../Icon';
import { LOUNGE_NAMES, VENDOR } from '../../types/constants';

const LoungeList: React.FC<{
  handleSelect: (value: string) => void;
  className?: string;
  myLounge?: string;
  all?: boolean;
}> = ({ handleSelect, className, myLounge, all = false }) => {
  const [opend, setOpend] = React.useState({});
  const handleToggle = (name: string) => {
    setOpend({ ...opend, [name]: !opend[name as keyof typeof opend] });
  };

  return (
    <List className={cx('LoungeList', className)}>
      {VENDOR.map((vendor) => (
        <React.Fragment key={vendor.name}>
          <Lounge
            lounge={vendor.name}
            icon={
              opend[vendor.name as keyof typeof opend] ? 'arrowUp' : 'arrowDown'
            }
            onClick={() => handleToggle(vendor.name)}
          />
          <React.Fragment>
            {opend[vendor.name as keyof typeof opend] &&
              vendor.children.map((model) => (
                <Lounge
                  key={model.name}
                  isSubMenu
                  lounge={model.name}
                  onClick={() => handleSelect(model.name)}
                  isMyLounge={myLounge === model.name}
                />
              ))}
          </React.Fragment>
        </React.Fragment>
      ))}
      <Lounge
        lounge="기타 제조사"
        onClick={() => handleSelect('기타 제조사')}
        isMyLounge={myLounge === '기타 제조사'}
      />

      {all && <Spacing size={8} />}
      {all &&
        Object.values(LOUNGE_NAMES)
          .filter((value) => value !== LOUNGE_NAMES.ALL)
          .map((name) => (
            <Lounge
              key={name}
              lounge={name}
              onClick={() => handleSelect(name)}
              isMyLounge={myLounge === name}
            />
          ))}
    </List>
  );
};

export default LoungeList;

const List = styled.ol`
  overflow-y: auto;
  font-size: 17px;
  color: ${colors.black22};
  padding: 0 0 64px 0;

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

const Spacing = styled.div<{ size: number }>`
  height: ${(p) => p.size}px;
  background-color: ${colors.blackF7};
`;

const Lounge: React.FC<{
  lounge: string;
  icon?: IconKey;
  isSubMenu?: boolean;
  isMyLounge?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({
  lounge,
  icon,
  isSubMenu = false,
  disabled = false,
  isMyLounge = false,
  onClick = () => {},
}) => {
  return (
    <li
      onClick={onClick}
      className={cx(
        'Lounge',
        disabled ? 'disabled' : '',
        isSubMenu ? 'subMenu' : '',
      )}
    >
      <p className="Name">
        {lounge}
        {isMyLounge && <span className="Badge">my</span>}
      </p>
      {icon && <Icon icon={icon} size="16px" color={colors.blackBF} />}
    </li>
  );
};
