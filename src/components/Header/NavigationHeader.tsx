/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';
import { useModal } from '../Modal';
import Icon from '../Icon';
import Carousel from '../Carousel';

import { colors } from '../../styles';
import { CAROUSEL } from '../../types/constants';
import { NAVIGATIONS, LOUNGE } from '../../types/constants';
import LoungeForm from '../SignUp/LoungeForm';

const SelectModel: React.FC<{
  selectedItem: string;
  handleSelect: (v: string) => void;
}> = ({
  handleSelect,
  selectedItem,
}) => {
    const step = React.useRef(0);
    const [vendor, setVendor] = React.useState('');
    const handleNext = () => {
      (window as any).__OWNER__[CAROUSEL.LOUNGE_SELECTOR](step.current + 1);
      step.current = step.current + 1;
    }
    const handlePrev = () => {
      (window as any).__OWNER__[CAROUSEL.LOUNGE_SELECTOR](step.current - 1);
      step.current = step.current - 1;
      setVendor('');
    }

    return (
      <CarouselWrapper>
        <Carousel
          id={CAROUSEL.LOUNGE_SELECTOR}
          index={step.current}
          onChangeIndex={() => { }}
          gesture={false}
        >
          <LoungeForm.VendorForm
            handleNext={handleNext}
            setVendor={setVendor}
            setModel={handleSelect}
            hideHead
          />
          <LoungeForm.ModelForm
            vendor={vendor}
            model={selectedItem}
            hideHead
            setModel={handleSelect}
            handlePrev={handlePrev}
          />
        </Carousel>
      </CarouselWrapper>

    )
  }

const NavigationHeader: React.FC<{ underline?: boolean; }> = ({ underline = false }) => {
  const { article } = useStore();
  const modal = useModal();
  const handleSelect = (model: string) => {
    article.selectedLounge = model;
    article.selectedGroup = LOUNGE;
    setTimeout(() => {
      modal.close();
    }, 300);
  }
  const handleOpenBottomSheet = React.useCallback(() => {
    modal.open({
      title: '오너클럽을 선택하세요',
      contents: <SelectModel selectedItem={article.selectedLounge} handleSelect={handleSelect} />,
    });
  }, [article.selectedGroup, article.selectedLounge, modal]);

  const handleSetGroup = React.useCallback(
    (selected: string) => {
      article.selectedGroup = selected;
      const moveIndex = Math.max(
        NAVIGATIONS.findIndex((name) => name === selected),
        0,
      );
      (window as any).__OWNER__[CAROUSEL.HOME](moveIndex);
    },
    [article],
  );

  const delayCondition = React.useRef(Date.now());
  const isFreezed = () => Date.now() - delayCondition.current < 500;

  return (
    <Header underline={underline}>
      <List>
        {NAVIGATIONS.map((name) => (
          <React.Fragment key={name}>
            {name === LOUNGE ? (
              <LougeSelector
                selected={article.selectedGroup === LOUNGE}
                key={LOUNGE}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
                  if (article.selectedGroup === LOUNGE) {
                    handleOpenBottomSheet();
                  } else {
                    handleSetGroup(name);
                  }
                }}
              >
                {article.selectedLounge}
                <Icon icon="dropdown" size="16px" />
              </LougeSelector>
            ) : (
              <Item
                selected={name === article.selectedGroup}
                key={name}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
                  handleSetGroup(name);
                }}
              >
                {name}
              </Item>
            )}
          </React.Fragment>
        ))}
      </List>
    </Header>
  );
};

export default observer(NavigationHeader);

const HEIGHT = 56;

const Header = styled.nav<{ underline: boolean; }>`
  display: flex;
  align-items: center;
  height: ${HEIGHT}px;
  width: 100%;
  background: ${colors.white};
  ${p => p.underline && css`
    border-bottom: 1px solid ${colors.blackEB};
  `}
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  height: 29px;
  padding: 0 20px;
  overflow-x: auto;
  li + li {
    margin-left: 12px;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(p) => (p.selected ? colors.black33 : colors.blackBF)};
  word-break: keep-all;
  white-space: nowrap;
  cursor: pointer;
`;

const LougeSelector = styled(Item) <{ selected: boolean }>`
  display: flex;
  svg {
    color: ${(p) => (p.selected ? colors.primary : colors.blackBF)};
    margin-left: 4px;
  }
`;

const CarouselWrapper = styled.div`
  height: 408px;
  padding: 18px 0;
  overflow-y: auto;
`;