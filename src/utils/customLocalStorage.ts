type CustomLocalStorageType = {
  getData: (name: string) => string | null;
  setData: (name: string, value: string) => void;
  deleteData: (name: string) => void;
  deleteAllData: () => void;
};

export const customLocalStorage: CustomLocalStorageType = {
  getData: (name: string) => {
    if (!name.trim()) return null;
    const val = localStorage.getItem(name);
    if (!val) {
      return null;
    }
    return JSON.parse(val);
  },
  setData: (name: string, value: string | any[]) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  deleteData: (name: string) => {
    localStorage.removeItem(name);
  },
  deleteAllData: () => {
    localStorage.clear();
  },
};
