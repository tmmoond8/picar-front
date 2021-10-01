const STORAGE_KEYS = {
  STACK: 'APP_STACK',
  SCROLL: 'PICAR_SCROLL',
  PAGE: 'PICAR_PAGE',
} as const;

const sessionStorage = globalThis?.sessionStorage;

const storage = {
  initStack: () => {
    if (!sessionStorage) return;
    const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
    if (!currentStack) {
      sessionStorage.setItem(
        STORAGE_KEYS.STACK,
        window.history.length.toString(),
      );
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
  },
  setScroll: (group: string, scrollHegiht: number) => {
    if (!sessionStorage) return;
    const scrollMap = JSON.parse(
      sessionStorage.getItem(STORAGE_KEYS.SCROLL) ?? '{}',
    );
    scrollMap[group] = scrollHegiht;
    sessionStorage.setItem(STORAGE_KEYS.SCROLL, JSON.stringify(scrollMap));
  },
  getScroll: (group: string) => {
    if (!sessionStorage) return;
    const scrollMap = JSON.parse(
      sessionStorage.getItem(STORAGE_KEYS.SCROLL) ?? '{}',
    );
    return scrollMap[group] ?? 0;
  },
  clearScroll: () => {
    if (!sessionStorage) return;
    sessionStorage.setItem(STORAGE_KEYS.SCROLL, '{}');
  },
  setPage: (group: string, page: number) => {
    if (!sessionStorage) return;
    const pageMap = JSON.parse(
      sessionStorage.getItem(STORAGE_KEYS.PAGE) ?? '{}',
    );
    pageMap[group] = page;
    sessionStorage.setItem(STORAGE_KEYS.PAGE, JSON.stringify(pageMap));
  },
  getPage: (group: string) => {
    if (!sessionStorage) return;
    const pageMap = JSON.parse(
      sessionStorage.getItem(STORAGE_KEYS.PAGE) ?? '{}',
    );
    return pageMap[group] ?? 1;
  },
  clearPage: () => {
    if (!sessionStorage) return;
    sessionStorage.setItem(STORAGE_KEYS.PAGE, '{}');
  },
};

export default storage;
