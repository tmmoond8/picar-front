/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Icon from '../Icon';
import { colors, desktop } from '../../styles';
import { LOUNGES } from '../../types/constants';

interface LoungeGridProps {
  selectedLounge?: string;
  onClick: (group: string) => void;
}

export default function LoungeGrid(props: LoungeGridProps): JSX.Element {
  const { onClick, selectedLounge: _selectedLounge = '' } = props;
  const [selectedLounge, setselectedLounge] = React.useState(_selectedLounge);
  return (
    <Grid>
      <ul>
        {LOUNGES.map(({ name, icon }) => (
          <Lounge
            onClick={() => {
              setselectedLounge(name);
              onClick(name);
            }}
            key={name}
            selected={selectedLounge === name}
          >
            <Icon icon={icon} size="36px" />
            <span>{name}</span>
          </Lounge>
        ))}
      </ul>
    </Grid>
  );
}

const Grid = styled.div`
  max-width: 375px;
  max-height: 352px;
  margin: 0 auto;
  padding: 20px;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
`;

const Lounge = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${colors.blackF5F6F7};
  outline: none;
  cursor: pointer;
  ${desktop(
    css`
      height: 120px;
    `,
  )}

  svg {
    width: 40%;
    height: auto;
  }

  span {
    width: 100%;
    margin-left: 8px;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.black22};
  }

  ${(p) =>
    p.selected &&
    css`
      background-color: ${colors.primaryE};
      span {
        color: ${colors.primary};
      }
    `}
`;
