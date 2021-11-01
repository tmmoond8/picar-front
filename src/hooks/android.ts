import React from 'react';
import { App } from '@capacitor/app';
import { useStore } from '../stores';
import { useAlert } from '../components/Alert';
import { isAndroid } from '../modules/crossPlatform';

export const useAndroid = () => {
  const { ui, util } = useStore();
  const alert = useAlert();
  const handler = () => {
    if (ui.modals.length > 0) {
      const modal = ui.modals[ui.modals.length - 1];
      return modal.handleClose();
    }
    if (ui.alerts.length > 0) {
      const alert = ui.alerts[ui.alerts.length - 1];
      return alert.handleClose();
    }
    if (util.history.goBack() === -1) {
      alert.open({
        title: '앱을 종료 하시겠어요?',
        handleConfirm: async () => {
          alert.close();
          setTimeout(() => {
            App.exitApp();
          }, 300);
        },
      });
    }
  };

  React.useEffect(() => {
    if (isAndroid()) {
      App.addListener('backButton', handler);
      return () => {
        App.removeAllListeners();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
