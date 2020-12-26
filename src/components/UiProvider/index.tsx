import React from 'react';
import ContextMenuViewer, { ContextMenuData } from '../ContextMenu';
import { useStore, observer } from '../../stores';
import global from '../../types/global';

const UiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { ui } = useStore();

  React.useEffect(() => {
    global.__OWNER__.openContextMenu = (data: ContextMenuData) => {
      ui.contextMenu = [...ui.contextMenu, data];
    };
    global.__OWNER__.closeContextMenu = (targetId: string) => {
      ui.contextMenu = ui.contextMenu.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {ui.contextMenu.map((contextMenu) => (
        <ContextMenuViewer
          key={`${contextMenu.id}_${contextMenu.xPosition}_${contextMenu.yPosition}`}
          {...contextMenu}
        />
      ))}
      {children}
    </React.Fragment>
  );
};

export default observer(UiProvider);
