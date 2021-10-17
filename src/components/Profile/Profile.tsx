/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import Squircle from '../Squircle';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import { Profile as TProfile } from '../../types/User';

const Profile: React.FC<
  Pick<TProfile, 'name' | 'group' | 'profileImage' | 'description' | 'code'> & {
    className?: string;
    canEdit?: boolean;
  }
> = ({
  name,
  group,
  description,
  profileImage,
  className,
  code,
  canEdit = false,
}) => {
  const { util, user } = useStore();
  const handleClickEditIntroduction = React.useCallback(() => {
    util.history.push('/myProfile/edit', { focus: 'ProfileIntoduction' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserProfile className={cx('Profile', className)}>
      <Squircle
        className="Photo"
        src={profileImage}
        size={96}
        onClick={handleClickEditIntroduction}
      />
      <h2 className="Name">{name}</h2>
      <h4 className="Group">{group}</h4>
      {description && <p className="Introduction">{description}</p>}
      {!description && code === user.profile.code && canEdit && (
        <p className="EditIntrodution" onClick={handleClickEditIntroduction}>
          프로필 소개 추가...
        </p>
      )}
    </UserProfile>
  );
};

export default observer(Profile);

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .Photo {
    display: inline-block;
    margin: 12px 0 0 0;
  }

  .Name {
    margin: 12px 0 0 0;
    font-size: 17px;
    font-weight: 500;
    color: ${colors.black22};
  }

  .Group {
    margin: 8px 0 0 0;
    color: ${colors.black77};
    font-size: 14px;
  }

  .Introduction,
  .EditIntrodution {
    width: 100%;
    margin: 12px 0 0 0;
    padding: 12px 28px;
    font-size: 15px;
    color: ${colors.black77};
    line-height: 1.7;
    text-align: center;
  }

  .EditIntrodution {
    color: ${colors.primary2};
    cursor: pointer;
  }
`;
