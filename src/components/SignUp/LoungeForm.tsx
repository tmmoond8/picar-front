/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useSignUpContext, observer } from './context';
import Button from '../Button';
import Content from '../Content';
import Input from '../Input';
import Icon from '../Icon';
import LoungeGrid from '../LoungeGrid';
import { colors } from '../../styles';
import { VENDOR } from '../../types/constants';

const VendorForm = observer(({
  vendor,
  setVendor,
  handleNext,
}: {
  vendor: string;
  setVendor: (vendor: string) => void;
  handleNext: () => void;
}) => {

  return (
    <Form>
      <Input.Label
        label="오너클럽을 선택하세요"
        subLabel="선택하신 차량 클럽으로 대표라운지가 설정됩니다."
      />
      <Content.Spacing size={30} />
      <SelectList >
        {VENDOR.map((vendor) => (
          <SelectItem
            key={vendor.name}
            onClick={() => (setVendor(vendor.name), handleNext())}
            hasRightArrow
          >
            <VendorName>
              {vendor.icon && <Icon icon={vendor.icon as any} />}
              <span>{vendor.displayName}</span>
            </VendorName>
            <Icon icon="arrowRight" color={colors.black33} />
          </SelectItem>
        ))}
        <SelectItem onClick={() => (setVendor('etc'))}>
          기타 제조사
        </SelectItem>
      </SelectList>
    </Form>
  );
});

const ModelForm = observer(() => {
  const { lounge, setLounge } = useSignUpContext();

  return (
    <Form>
      <Input.Label
        label="오너클럽을 선택하세요"
        subLabel="선택하신 차량 클럽으로 대표라운지가 설정됩니다."
      />
      <Content.Spacing size={30} />
      <LoungeGrid
        selectedLounge={lounge}
        onClick={(lounge: string) => {
          setLounge(lounge);
        }}
      />
    </Form>
  );
});

const BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const { lounge } = useSignUpContext();
  const disabled = React.useMemo(() => lounge === '', [lounge]);
  return (
    <Button.BottomCTA onClick={onClick} disabled={disabled}>
      가입하기
    </Button.BottomCTA>
  );
});

export default {
  VendorForm,
  ModelForm,
  BottomCTA,
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0 18px;
  background-color: ${colors.white};
  h2 {
    color: ${colors.black};
    font-weight: 500;
    font-size: 19px;
    letter-spacing: -0.5px;
  }
  p {
    color: ${colors.blackCC};
    font-size: 14px;
    line-height: 1.43;
  }
`;

const SelectList = styled.ul`
  li + li {
    margin-top: 8px;
  }
`;

const SelectItem = styled.li<{ hasRightArrow?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 16px 8px 18px;
  border-radius: 8px;
  background-color: ${colors.blackF7};
  color: ${colors.black33};
  font-size: 16px; 

  &:active {
    background-color: ${colors.blackEB};
  }
`;

const VendorName = styled.div`
  display: flex;
  flex: 1;
`;