/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useSignUpContext, observer } from './context';
import Button from '../Button';
import Content from '../Content';
import Input from '../Input';
import Icon from '../Icon';
import { colors } from '../../styles';
import { VENDOR } from '../../types/constants';

const VendorForm = observer(({ handleNext }: { handleNext: () => void; }) => {
  const { setVendor, } = useSignUpContext();

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
        <SelectItem onClick={() => (setVendor('ETC'))}>
          기타 제조사
        </SelectItem>
      </SelectList>
    </Form>
  );
});

const ModelForm = observer(() => {
  const { step, setStep, vendor, model, setModel } = useSignUpContext();
  const models = React.useMemo(() => {
    return VENDOR.find(({ name }) => name === vendor)?.children ?? [];
  }, [vendor])

  return (
    <Form>
      <Input.Label
        label="오너클럽을 선택하세요"
        subLabel="선택하신 차량 클럽으로 대표라운지가 설정됩니다."
      />
      <Content.Spacing size={30} />

      <SelectList >
        <SelectItem onClick={() => (setStep(step - 1), setModel(''))}>
          이전으로
        </SelectItem>
        {models.length > 0 && models.map((vendor) => (
          <SelectItem
            key={vendor.name}
            onClick={() => setModel(vendor.name)}
            selected={model === vendor.name}
          >
            <VendorName>
              <span>{vendor.displayName}</span>
            </VendorName>
          </SelectItem>
        ))}
      </SelectList>
      <IsModel404>내가 원하는 클럽이 없나요?</IsModel404>
    </Form>
  );
});

const BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const { model } = useSignUpContext();
  const disabled = React.useMemo(() => model === '', [model]);
  return (
    <Button.BottomCTA onClick={onClick} disabled={disabled}>
      가입완료
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

const SelectItem = styled.li<{ hasRightArrow?: boolean; selected?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 16px 8px 18px;
  border-radius: 8px;
  background-color: ${colors.blackF7};
  color: ${colors.black33};
  font-size: 16px; 

  ${p => p.selected && css`
    border: solid 1px ${colors.black22};
    background-color: ${colors.transparent};
  `}
`;

const VendorName = styled.div`
  display: flex;
  flex: 1;
`;

const IsModel404 = styled.p`
  && {
    font-size: 14px;
    font-weight: 400;
    color: ${colors.primary2};
    margin: 18px 0 0 0;
  }
`