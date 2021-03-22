const STORAGE_KEYS = {
    OWWNERS_UUID: 'OWWNERS_UUID',
} as const;

const storage = {
    getUUID: () => {
        return localStorage.getItem(STORAGE_KEYS.OWWNERS_UUID) || null;
    },
    setUUID: (uuid: string) => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_UUID, uuid);
    },
    clearUUID: () => {
        localStorage.setItem(STORAGE_KEYS.OWWNERS_UUID, '');
    },
}

export default storage;