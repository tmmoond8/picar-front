import React from 'react';
import { Plugins } from '@capacitor/core'
import { useStore } from '../stores';
import { useAlert } from '../components/Alert';
import { isAndroid } from '../modules/crossPlatform';

export const useAndroid = () => {
  const { ui, util }  = useStore();
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
    if (util.history.goBack() === 0) {
      alert.open({
        title: '앱을 종료 하시겠어요?',
        handleConfirm: async () => {
          alert.close();
          setTimeout(() => {
            Plugins.App.exitApp();
          }, 300)
        },
      })
    }
  }

  React.useEffect(() => {
    if (isAndroid()) {
      Plugins.App.addListener('backButton', handler);
      return () => {
        Plugins.App.removeAllListeners()
      };
    }
  }, [])
}