const STORAGE_KEYS = {
  STACK: 'APP_',
} as const;

const sessionStorage = globalThis?.sessionStorage;

const storage = {
  initStack: () => {
      if (!sessionStorage) return;
      const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
      if (!currentStack) {
          sessionStorage.setItem(STORAGE_KEYS.STACK, window.history.length.toString());
      }
  },
  pushStack: () => {
      if (!sessionStorage) return;
      const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
      const nextStack = Number(currentStack) + 1;
      sessionStorage.setItem(STORAGE_KEYS.STACK, `${nextStack}`);
      return nextStack;
  },
  popStack: () => {
      if (!sessionStorage) return;
      const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
      if (currentStack && parseInt(currentStack) <= 1) {
          return -1;
      }
      const nextStack = Number(currentStack) - 1;
      sessionStorage.setItem(STORAGE_KEYS.STACK, `${nextStack}`);
      return nextStack;
  },
  top: () => {
      if (!sessionStorage) return;
      const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
      return Number(currentStack);
  }
}

export default storage;