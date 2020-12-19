import { useBottomSheet } from './hooks';
import {BottomSheetProps } from  './BottomSheet';

export { default as BottomSheetViewer} from './BottomSheet';

export default {
  useBottomSheet,
};

export type BottomSheet = ReturnType<typeof useBottomSheet>
export type BottomSheetData = BottomSheetProps;