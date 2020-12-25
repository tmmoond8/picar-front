/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Profile from '../components/Profile';
import ContextMenu from '../components/ContextMenu';

export default (function TestPage(): JSX.Element {
  return (
    <React.Fragment>
      <Profile.Form handleClose={() => console.log('')} />
      <ContextMenu
        xPosition={85}
        yPosition={250}
        menus={[
          { name: '수정하기', onClick: () => console.log('수정') },
          { name: '삭제하기', onClick: () => console.log('삭제') },
        ]}
        handleClose={() => console.log('close')}
      />
    </React.Fragment>
  );
});
