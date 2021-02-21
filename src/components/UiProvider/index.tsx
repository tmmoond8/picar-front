import React from 'react';
import ContextMenuViewer, { ContextMenuData, CustomContextMenuData, CustomContextMenuViewer } from '../ContextMenu';
import ToastContainer from '../ToastContainer';

import ModalViewer, {
  ModalData,
  useModal,
} from '../Modal';
import { useStore, observer } from '../../stores';
import 'react-toastify/dist/ReactToastify.css';
import global from '../../types/global';
import { Profile as UserProfile } from '../../types/User';
import { useCheckLogin, useBreakpoint } from '../../hooks';
import UiStore from '../../stores/uiStore';

const UiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { ui, user } = useStore();
  const modal = useModal();
  const needLogin = useCheckLogin(
    (profile: UserProfile) => user.setProfile(profile),
    modal,
  );
  const queryMatch = useBreakpoint();
  React.useEffect(() => {
    ui.queryMatch = queryMatch;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryMatch]);

  user.needLogin = () => needLogin(user.profile.code);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useSetupContextMenu(ui);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useSetupModal(ui);

  return (
    <React.Fragment>
      {ui.contextMenus.map((contextMenu) => (
        <React.Fragment key={`${contextMenu.id}_${contextMenu.xPosition}_${contextMenu.yPosition}`}>
          {'menus' in contextMenu && <ContextMenuViewer {...contextMenu} />}
          {'contents' in contextMenu && <CustomContextMenuViewer {...contextMenu} />}
        </React.Fragment>
      ))}
      {ui.modals.map((modal) => (
        <ModalViewer key={modal.id} {...modal} />
      ))}
      <ToastContainer />
      {children}
    </React.Fragment>
  );
};

export default observer(UiProvider);

function useSetupModal(ui: UiStore) {
  React.useEffect(() => {
    global.__OWNER__.openModal = (data: ModalData) => {
      ui.modals = [...ui.modals, data];
    };
    global.__OWNER__.closeModal = (targetId: string) => {
      ui.modals = ui.modals.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


function useSetupContextMenu(ui: UiStore) {
  React.useEffect(() => {
    global.__OWNER__.openContextMenu = (data: ContextMenuData | CustomContextMenuData) => {
      ui.contextMenus = [...ui.contextMenus, data];
    };
    global.__OWNER__.closeContextMenu = (targetId: string) => {
      ui.contextMenus = ui.contextMenus.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
