import React from 'react';
import ContextMenuViewer, { ContextMenuData, CustomContextMenuData, CustomContextMenuViewer } from '../ContextMenu';
import ToastContainer from '../ToastContainer';
import AlertViewer, { AlertData } from '../Alert';

import ModalViewer, {
  ModalData,
  useModal,
} from '../Modal';
import { useStore, observer } from '../../stores';
import 'react-toastify/dist/ReactToastify.css';
import global from '../../types/global';
import { crossPlatform } from '../../modules';
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
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      ui.contextMenus = [];
    })
  }, [])
  React.useEffect(() => {
    window.addEventListener('load', () => {
      console.log('load event');
      // react-snap 으로 프리렌더 시 window.applicationCache 파일이 생성됨
      if (!crossPlatform.isPreRendering()) {
        console.log('pre render');
        const splashEl = document.querySelector<HTMLDivElement>('.splash');
        if (!!splashEl) {
          splashEl.style.display = 'none';
        }
      }
    })

    const events = [
      'DOMContentLoaded', 'pagehide', 'pageshow',
      'unload', 'load'
    ];

    events.forEach(eventName =>
      window.addEventListener(eventName, () => { console.log('-event', eventName) })
    );

    document.onreadystatechange = function () {
      console.log('document.readyState', document.readyState);
    }
  }, [])

  user.needLogin = () => needLogin(user.profile.code);

  useSetupContextMenu(ui);
  useSetupModal(ui);
  useSetupAlert(ui);
  useOrientation('portrait');

  return (
    <React.Fragment>
      {ui.contextMenus.map((contextMenu) => (
        <React.Fragment key={`${contextMenu.id}`}>
          {'menus' in contextMenu && <ContextMenuViewer {...contextMenu} />}
          {'contents' in contextMenu && <CustomContextMenuViewer {...contextMenu} />}
        </React.Fragment>
      ))}
      {ui.modals.map((modal) => (
        <ModalViewer key={modal.id} {...modal} />
      ))}
      {ui.alerts.map((alert) => (
        <AlertViewer key={alert.id} {...alert} />
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


function useSetupAlert(ui: UiStore) {
  React.useEffect(() => {
    global.__OWNER__.openAlert = (data: AlertData) => {
      ui.alerts = [...ui.alerts, data];
    };
    global.__OWNER__.closeAlert = (targetId: string) => {
      ui.alerts = ui.alerts.filter(({ id }) => id !== targetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function useOrientation(orientation: 'portrait' | 'landscape') {
  if (crossPlatform.isIosAndHybrid() && window.screen &&
    window.screen.orientation && typeof window.screen.orientation.lock === 'function') {
    try {
      window.screen.orientation.lock(orientation);
    } catch (error) {
      console.error(error);
    }
  }
}