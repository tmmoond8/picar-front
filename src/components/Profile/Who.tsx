/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../../styles';

interface WhoProps {
  className?: string;
  name: string;
  group?: string;
}

export default function ProfileWho(props: WhoProps): JSX.Element {
  const { name, group, className } = props;
  return (
    <Who className={className}>
      <p className="user-name">{name}</p>
      {group && <p className="user-group">{group}</p>}
    </Who>
  );
}

const Who = styled.div`
  display: flex;
  .user-name {
    font-size: 13px;
    color: ${colors.black50};
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
