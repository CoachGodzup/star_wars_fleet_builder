import axios from 'axios';

export const setCache = <T>(url: string, data: T): void => {
  localStorage.setItem(url, JSON.stringify(data));
};

export const getCache = <T>(url: string): T | undefined => {
  const data = localStorage.getItem(url);
  return data ? JSON.parse(data) : undefined;
};

export const cacheable = <T>(url: string): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataFromCache = getCache<T>(url);
      if (dataFromCache) {
        resolve(dataFromCache);
      } else {
        const response = await axios.get<T>(url);
        setCache(url, response.data);
        resolve(response.data);
      }
    } catch (e) {
      reject(e);
    }
  });
};
