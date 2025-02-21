import axios from 'axios';
import { fetchPerson, fetchPersonRequest } from '@/api/swapi/person';
import { Person } from '@/model/person';
import { mockPerson } from '../mocks/mock.person';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPerson', () => {
  it('should fetch people by search term', async () => {
    const searchRequest: fetchPersonRequest = {
      type: 'search',
      search: 'Luke',
    };
    const mockData: Person[] = [mockPerson];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPerson(searchRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke',
    );
  });

  it('should fetch person by id', async () => {
    const getRequest: fetchPersonRequest = { type: 'get', id: 1 };
    const mockData: Person[] = [mockPerson];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPerson(getRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1',
    );
  });

  it('should handle errors', async () => {
    const searchRequest: fetchPersonRequest = {
      type: 'search',
      search: 'Luke',
    };
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchPerson(searchRequest)).rejects.toThrow(errorMessage);
  });
});
