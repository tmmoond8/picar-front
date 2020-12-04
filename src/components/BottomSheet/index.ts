import { useBottomSheet, useCloseCallback } from './hooks';

export default {
  useBottomSheet,
  useCloseCallback,
};

export type BottomSheet = ReturnType<typeof useBottomSheet>