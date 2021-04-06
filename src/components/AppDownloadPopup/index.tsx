import React from 'react';
import AndroidDownloadPopup from './AndroidDownloadPopup';
import { appDownChecker, crossPlatform } from '../../modules'

const AppDownloadPopup = () => {
  const [isShown, setIsShown] = React.useState(appDownChecker.needShow());
  const isAndroidShown = React.useMemo(() => isShown && crossPlatform.isAndroid(), [isShown]);

  const handleClickClose = React.useCallback(() => {
    appDownChecker.saveLocal();
    setIsShown(false);
  }, []);

  const handleClickNoShow = React.useCallback(() => {
    appDownChecker.saveSession();
    setIsShown(false);
  }, []);

  return (
    <React.Fragment>
      {isAndroidShown && (
        <AndroidDownloadPopup 
          onClose={handleClickClose} 
          onClickNoShow={handleClickNoShow}
        />
      )}
    </React.Fragment>
  )
}

export default AppDownloadPopup;