/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../../styles';

interface WhoProps {
  className?: string;
  name: string;
  group?: string;
  nameColor?: string;
  right?: React.ReactNode;
}

export default function ProfileWho(props: WhoProps): JSX.Element {
  const { name, group, className, nameColor, right } = props;
  return (
    <Who className={className} nameColor={nameColor}>
      <p className="user-name">{name}</p>
      {group && <p className="user-group">{group}</p>}
      {right && right}
    </Who>
  );
}

const Who = styled.div<{ nameColor?: string }>`
  display: flex;
  font-weight: 500;

  .user-name {
    font-size: 13px;
    color: ${colors.black50};
    ${(p) =>
      p.nameColor &&
      css`
        color: ${colors.primary};
      `}
  }
  .user-group {
    position: relative;
    margin-left: 10px;
    font-size: 13px;
    color: ${colors.black99};
    &::before {
      content: '·';
      position: absolute;
      width: 10px;
      height: 10px;
      left: -8px;
      top: 0px;
    }
  }
`;
