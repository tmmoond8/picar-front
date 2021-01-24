import React from 'react';

import { ModalData } from './ModalViewer';

export { observer } from 'mobx-react';

const ModalContext = React.createContext<{
  bottomSheets: ModalData[];
}>({
  bottomSheets: []
});

ModalContext.displayName = 'ModalContext';

export const useModalContext = () => {
  return React.useContext(ModalContext);
};

export default ModalContext;