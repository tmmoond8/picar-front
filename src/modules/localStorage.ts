const STORAGE_KEYS = {
    OWWNERS_OPENER_UUID: 'OWWNERS_OPENER_UUID',
    OWWNERS_EX_WINDOW_UUID: 'OWWNERS_EX_WINDOW_UUID',
} as const;

const storage = {
    getOpenerUUID: () => {
        return localStorage.getItem(STORAGE_KEYS.OWWNERS_OPENER_UUID) || null;
    },
    setOpenerUUID: (uuid: string) => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_OPENER_UUID, uuid);
    },
    clearOpenerUUID: () => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_OPENER_UUID, '');
    },
    getExWindowUUID: () => {
        return localStorage.getItem(STORAGE_KEYS.OWWNERS_EX_WINDOW_UUID) || null;
    },
    setExWindowUUID: (uuid: string) => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_EX_WINDOW_UUID, uuid);
    },
    clearExWindowUUID: () => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_EX_WINDOW_UUID, '');
    },
}

export default storage;