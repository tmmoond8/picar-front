/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

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
        {ROUNGES.map(({ name }) => (
          <Rounge onClick={() => onClick(name)}>
            <img src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1566913146/noticon/tana13ypatttkymflhse.png" />
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
    grid-gap: 10px;
    padding: 16px 18px;
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
    `
  )}

  img {
    position: absolute;
    width: 50px;
    height: auto;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    left: 0;
    bottom: 13px;
    width: 100%;
    font-size: 15px;
    text-align: center;
  }
`;
