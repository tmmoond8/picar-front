import React, { useState } from 'react';
import BottomSheetContext from './context';
import { useBottomSheet } from './hooks';
import BottomSheetViewer, { BottomSheetData } from './BottomSheetViewer';
import global from '../../types/global';

export { default as BottomSheetViewer } from './BottomSheetViewer';

export default {
  useBottomSheet,
};

export type BottomSheet = ReturnType<typeof useBottomSheet>;

export const BoottomSheetProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bottomSheets, setBottomSheets] = useState<BottomSheetData[]>([]);

  React.useEffect(() => {
    global.__OWNER__.openBottomSheet = (bottomSheet: BottomSheetData) => {
      setBottomSheets([...bottomSheets, bottomSheet]);
    };
    global.__OWNER__.closeBottomSheet = (targetId: string) => {
      setBottomSheets(bottomSheets.filter(({ id }) => id !== targetId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheets,
      }}
    >
      {bottomSheets.map((bottomSheet) => (
        <BottomSheetViewer key={bottomSheet.id} {...bottomSheet} />
      ))}
      {children}
    </BottomSheetContext.Provider>
  );
};
