const STORAGE_KEYS = {
    OWWNERS_INIT_STACK: 'OWWNERS_INIT_STACK',
    OWWNERS_CURRENT_STACK: 'OWWNERS_CURRENT_STACK',
} as const;

const storage = {
    initStack: () => {
        const initStack = sessionStorage.getItem(STORAGE_KEYS.OWWNERS_INIT_STACK);
        if (!initStack) {
            sessionStorage.setItem(STORAGE_KEYS.OWWNERS_INIT_STACK, window.history.length.toString());
        }
    }
}

export default storage;