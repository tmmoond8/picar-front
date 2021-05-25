const STORAGE_KEYS = {
    STACK: 'APP_STACK',
} as const;

const storage = {
    initStack: () => {
        const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
        if (!currentStack) {
            sessionStorage.setItem(STORAGE_KEYS.STACK, window.history.length.toString());
        }
    },
    pushStack: () => {
        const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
        const nextStack = Number(currentStack) + 1;
        sessionStorage.setItem(STORAGE_KEYS.STACK, `${nextStack}`);
        return nextStack;
    },
    popStack: () => {
        const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
        if (currentStack && parseInt(currentStack) <= 1) {
            return -1;
        }
        const nextStack = Number(currentStack) - 1;
        sessionStorage.setItem(STORAGE_KEYS.STACK, `${nextStack}`);
        return nextStack;
    },
    top: () => {
        const currentStack = sessionStorage.getItem(STORAGE_KEYS.STACK);
        return Number(currentStack);
    }
}

export default storage;