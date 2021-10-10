/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { colors } from '../../styles';
import Icon from '../Icon';
import LoungeListComponent from './LoungeList';
import { Models } from '../../types/constants';
import { useModal } from '../Modal';

const lounges = Models.map(({ name }) => name);

const LoungeSelector: React.FC<{
  className?: string;
  selected: string;
  setSelected: (value: string) => void;
  label?: string;
  all?: boolean;
  myLounge?: string;
}> = ({ selected, setSelected, className, label, all = false, myLounge }) => {
  const modal = useModal();
  const handleSelect = React.useCallback(
    (value: string) => {
      modal.close();
      setSelected(value);
    },
    [setSelected, modal],
  );

  const handleOpenSelects = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      modal.open({
        title: '라운지 선택',
        contents: (
          <React.Fragment>
            <LoungeListComponent
              handleSelect={handleSelect}
              myLounge={myLounge}
              all={all}
            />
          </React.Fragment>
        ),
        isFull: true,
        hasTitleLine: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modal],
  );

  return (
    <Box className={cx('SelectBox', className)}>
      {label && <Label>{label}</Label>}
      <StyledSelector className={'Selector'} onClick={handleOpenSelects}>
        {selected}
        <Icon icon="arrowDown" color={colors.black22} size="16px" />
      </StyledSelector>
    </Box>
  );
};

export default LoungeSelector;

export const LoungeList = LoungeListComponent;

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

export const useSelector = (defaultValue?: string) => {
  return React.useState<string>(() =>
    lounges.length > 0 ? defaultValue || lounges[0] : '',
  );
};
