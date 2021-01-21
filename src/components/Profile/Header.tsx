/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import Icon from '../Icon';
import APIS from '../../apis';

const ProfileHeader: React.FC<{ className?: string}> = ({ className}) => {
  const { user, util } = useStore();
  const [ count, setCount ] = React.useState(0);
  const { code } = user.profile;

  const handleUnknown = React.useCallback(async () => {
    setCount(count + 1);
    if (count > 20) {
      const { data } = await APIS.auth.deleteUser(code);
      if (data.ok) {
        util.history.goBack();
        setTimeout(() => {
          window.location.reload();
        }, 300)
      }
    }
  }, [count])

  return (
    <Header className={cx('ProfileHeader', className)}>
      <UserId onClick={handleUnknown}>dosannan.222</UserId>
      <Icon icon="more" size="24px" color={colors.black22}/>
    </Header>
  )
}

export default observer(ProfileHeader);


export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 0 0;
  padding: 16px 18px;

  svg {
    justify-self: flex-end;
  }
`;

const UserId = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black22};
`;