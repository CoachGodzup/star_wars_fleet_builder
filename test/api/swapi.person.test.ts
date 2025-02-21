import axios from 'axios';
import {
  fetchPerson,
  GetPersonRequest,
  searchPerson,
  SearchPersonRequest,
} from '@/api/swapi/person';
import { Person } from '@/model/person';
import { mockPerson } from '../mocks/mock.person';
import { LocalStorageMock } from '../test-utils/localStorage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPerson', () => {
  global.localStorage = new LocalStorageMock();

  beforeEach(() => {
    localStorage.clear();
  });

  it('should fetch people by search term', async () => {
    const searchRequest: SearchPersonRequest = {
      type: 'search',
      search: 'Luke',
    };
    const mockData: Person[] = [mockPerson];

    mockedAxios.get = jest
      .fn()
      .mockResolvedValue({ data: { results: mockData } });

    const result = await searchPerson(searchRequest);

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke',
    );
  });

  it('should fetch person by id', async () => {
    const getRequest: GetPersonRequest = { type: 'get', id: 1 };
    const mockData: Person[] = [mockPerson];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPerson(getRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1',
    );
  });

  it('should handle errors', async () => {
    const searchRequest: SearchPersonRequest = {
      type: 'search',
      search: 'Luke',
    };
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(searchPerson(searchRequest)).rejects.toThrow(errorMessage);
  });
});
