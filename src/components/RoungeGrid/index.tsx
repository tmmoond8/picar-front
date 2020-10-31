/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from '../Icon';
import { colors, desktop } from '../../styles';
import { ROUNGES } from '../../types/constants';

interface RoungeGridProps {
  onClick: (group: string) => void;
}

export default function RoungeGrid(props: RoungeGridProps): JSX.Element {
  const { onClick } = props;
  return (
    <Grid>
      <ul>
        {ROUNGES.map(({ name, icon }) => (
          <Rounge onClick={() => onClick(name)} key={name}>
            <Icon icon={icon} size="40%" />
            <span>{name}</span>
          </Rounge>
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

const Rounge = styled.li`
  position: relative;
  height: calc((100vw - 36px - 2 * 10px) / 3);
  border-radius: 8px;
  background-color: ${colors.blackF5F6F7};
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
`;
