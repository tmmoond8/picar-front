/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import cx from 'classnames';
import { useStore, observer } from '../../stores';

import { colors } from '../../styles';
import Icon from '../Icon';

const BackHeader: React.FC<{
  className?: string;
  options?: {
    title?: string;
    right?: React.ReactNode;
    noBottomLine?: boolean;
  };
}> = ({ options = {}, className }) => {
  const { util } = useStore();

  return (
    <StyledBack
      noBottomLine={options.noBottomLine ?? false}
      className={cx('BackHeader', className)}
    >
      <h2 className="title">{options?.title || ''}</h2>
      <Icon
        icon="back"
        size="24px"
        color={colors.black100}
        onClick={() => util.history.goBack()}
      />
      <div className="right">{options?.right}</div>
    </StyledBack>
  );
};

export default observer(BackHeader);

const HEIGHT = 60;

const StyledBack = styled.nav<{ noBottomLine: boolean }>`
  position: relative;
  height: ${HEIGHT}px;
  min-height: ${HEIGHT}px;
  width: 100%;
  padding: 0 18px;
  background: ${colors.white};
  color: ${colors.black100};

  & > svg {
    position: absolute;
    left: 18px;
    top: 18px;
  }

  .title {
    line-height: ${HEIGHT}px;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
  }

  .right {
    display: flex;
    position: absolute;
    right: 18px;
    top: 18px;

    svg + svg {
      margin-left: 12px;
    }
  }
`;
