import axios from 'axios';
import {
  fetchSpecies,
  fetchSpeciesByUrl,
  FetchSpeciesRequest,
} from '@/api/swapi/species';
import { Species } from '@/model/species';
import { mockSpecies } from '../mocks/mock.species';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchSpecies', () => {
  it('should fetch species by id', async () => {
    const getRequest: FetchSpeciesRequest = { type: 'get', id: 36 };
    const mockData: Species[] = [mockSpecies];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchSpecies(getRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/species/36',
    );
  });

  it('should handle errors', async () => {
    const searchRequest: FetchSpeciesRequest = { type: 'get', id: 36 };
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchSpecies(searchRequest)).rejects.toThrow(errorMessage);
  });

  it('can fetch species given a url', async () => {
    const url = 'https://swapi.dev/api/species/36';
    const mockData: Species = mockSpecies;

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchSpeciesByUrl(url);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/species/36',
    );
  });

  it('should handle errors if URL is given', async () => {
    const url = 'https://swapi.dev/api/species/36';
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchSpeciesByUrl(url)).rejects.toThrow(errorMessage);
  });
});
