/* eslint-disable no-underscore-dangle */
type OwnerGlobal = typeof globalThis & {
  __OWNER__: {
    closeBottomSheet: () => void;
  };
};

if ((globalThis as OwnerGlobal).__OWNER__ === undefined) {
  Object.defineProperty(globalThis, '__OWNER__', {
    value: {
      closeBottomSheet: () => {},
    },
    enumerable: false,
    configurable: false,
    writable: false,
  });
}

export default globalThis as OwnerGlobal;
