import React from 'react';
import { Plugins,  } from '@capacitor/core'
import { useHistory } from 'react-router-dom';
import { useStore } from '../stores';

import { isAndroid } from '../modules/crossPlatform';

export const useAndroid = () => {
  const { ui }  = useStore();
  const handler = () => {
    if (ui.modals.length > 0) {
      const modal = ui.modals[ui.modals.length - 1];
      modal.handleClose();
    }
  }

  React.useEffect(() => {
    if (isAndroid()) {
      Plugins.App.addListener('backButton', handler);
      // document.addEventListener('ionBackButton', handler as any)
      return () => {
        Plugins.App.removeAllListeners()
      };
    }
  }, [])
}