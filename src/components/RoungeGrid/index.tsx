/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from '../Icon';
import { colors, desktop } from '../../styles';
import { ROUNGES } from '../../types/constants';

interface LoungeGridProps {
  selectedLounge?: string;
  onClick: (group: string) => void;
}

export default function LoungeGrid(props: LoungeGridProps): JSX.Element {
  const { onClick, selectedLounge = '' } = props;
  return (
    <Grid>
      <ul>
        {ROUNGES.map(({ name, icon }) => (
          <Lounge
            onClick={() => onClick(name)}
            key={name}
            selected={selectedLounge === name}
          >
            <Icon icon={icon} size="40%" />
            <span>{name}</span>
          </Lounge>
        ))}
      </ul>
    </Grid>
  );
}

const Grid = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 11px;
  }
`;

const Lounge = styled.li<{ selected: boolean }>`
  position: relative;
  height: calc((100vw - 36px - 2 * 10px) / 3);
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
    position: absolute;
    width: 40%;
    height: auto;
    left: 50%;
    top: 34%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    left: 0;
    bottom: 20%;
    width: 100%;
    font-size: 13px;
    text-align: center;
  }

  ${(p) =>
    p.selected &&
    css`
      background-color: ${colors.white};
      border: 1px solid ${colors.black33};
    `}
`;
