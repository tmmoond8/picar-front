/* eslint-disable no-underscore-dangle */
type OwnerGlobal = typeof globalThis & {
  __OWNER__: {
    closeBottomSheet: () => void;
    homeFlickingMoveTo: (i: number) => void;
    signupFlickingMoveTo: (i: number) => void;
  };
};

const global = globalThis as OwnerGlobal;

if (global.__OWNER__ === undefined) {
  global.__OWNER__ = {
    closeBottomSheet: () => {},
    homeFlickingMoveTo: (i: number) => {},
    signupFlickingMoveTo: (i: number) => {},
  };
}

export default global;
