import React from 'react';
import ContextMenuViewer, { ContextMenuData } from '../ContextMenu';
import { useStore } from '../../stores';
import global from '../../types/global';

const UiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { ui } = useStore();

  React.useEffect(() => {
    global.__OWNER__.openContextMenu = (data: ContextMenuData) => {
      ui.contextMenu = data;
    };
    global.__OWNER__.closeBottomSheet = () => {
      ui.contextMenu = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {ui.contextMenu && <ContextMenuViewer {...ui.contextMenu} />}
      {children}
    </React.Fragment>
  );
};

export default UiProvider;
