import React from 'react';

import { BottomSheetData } from './BottomSheetViewer';

export { observer } from 'mobx-react';

const BottomSheetContext = React.createContext<{
  bottomSheets: BottomSheetData[];
}>({
  bottomSheets: []
});

BottomSheetContext.displayName = 'BottomSheetContext';

export const useBottomSheetContext = () => {
  return React.useContext(BottomSheetContext);
};

export default BottomSheetContext;