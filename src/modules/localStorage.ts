const STORAGE_KEYS = {
  PICAR_UUID: 'PICAR_UUID',
  PICAR_TOKEN: 'PICAR_TOKEN',
} as const;

const storage = {
  getUUID: () => {
    return localStorage.getItem(STORAGE_KEYS.PICAR_UUID) || null;
  },
  setUUID: (uuid: string) => {
    localStorage.setItem(STORAGE_KEYS.PICAR_UUID, uuid);
  },
  clearUUID: () => {
    localStorage.setItem(STORAGE_KEYS.PICAR_UUID, '');
  },
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.PICAR_TOKEN) || null;
  },
  setToken: (uuid: string) => {
    localStorage.setItem(STORAGE_KEYS.PICAR_TOKEN, uuid);
  },
  clearToken: () => {
    localStorage.setItem(STORAGE_KEYS.PICAR_TOKEN, '');
  },
};

export default storage;
