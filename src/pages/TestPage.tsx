/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Profile from '../components/Profile';
import { useContextMenu } from '../components/ContextMenu';

export default (function TestPage(): JSX.Element {
  const contextMenu = useContextMenu();

  const handleClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    contextMenu.open({
      xPosition: clientX,
      yPosition: clientY,
      menus: [
        { name: '수정하기', onClick: () => console.log('수정') },
        { name: '삭제하기', onClick: () => console.log('삭제') },
      ],
    });
  };

  return (
    <React.Fragment>
      <Page onClick={handleClick} />
    </React.Fragment>
  );
});

const Page = styled.div`
  height: 100%;
  width: 100%;
  background: aqua;
`;
