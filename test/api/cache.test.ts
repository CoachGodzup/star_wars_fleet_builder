import axios from 'axios';
import { setCache, getCache, cacheable } from '../../src/api/cache';
import { wrapAxiosResponse } from '../test-utils/wrapAxiosResponse';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('cache.ts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setCache', () => {
    it('should store data in localStorage', () => {
      const url = 'http://example.com';
      const data = { key: 'value' };

      setCache(url, data);

      const storedData = localStorage.getItem(url);
      expect(storedData).toBe(JSON.stringify(data));
    });
  });

  describe('getCache', () => {
    it('should retrieve data from localStorage', () => {
      const url = 'http://example.com';
      const data = { key: 'value' };
      localStorage.setItem(url, JSON.stringify(data));

      const retrievedData = getCache<typeof data>(url);
      expect(retrievedData).toEqual(data);
    });

    it('should return undefined if no data is found', () => {
      const url = 'http://example.com';

      const retrievedData = getCache<typeof url>(url);
      expect(retrievedData).toBeUndefined();
    });
  });

  describe('cacheable', () => {
    it('should return data from cache if available', async () => {
      const url = 'http://example.com';
      const data = { key: 'value' };
      setCache(url, data);

      const result = await cacheable<typeof data>(url);
      expect(result).toEqual(data);
    });

    it('should fetch data from API if not in cache', async () => {
      const url = 'http://example.com';
      const data = { key: 'value' };
      mockedAxios.get.mockResolvedValue(wrapAxiosResponse(data));

      const result = await cacheable<typeof data>(url);
      expect(result).toEqual(data);
      expect(mockedAxios.get).toHaveBeenCalledWith(url);
    });

    it('should store fetched data in cache', async () => {
      const url = 'http://example.com';
      const data = { key: 'value' };
      mockedAxios.get.mockResolvedValue(wrapAxiosResponse(data));

      await cacheable<typeof data>(url);

      const cachedData = getCache<typeof data>(url);
      expect(cachedData).toEqual(data);
    });

    it('should reject if API call fails', async () => {
      const url = 'http://example.com';
      const error = new Error('Network Error');
      mockedAxios.get.mockRejectedValue(error);

      await expect(cacheable<typeof url>(url)).rejects.toThrow('Network Error');
    });
  });
});
