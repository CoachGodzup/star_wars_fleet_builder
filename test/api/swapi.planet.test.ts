import axios from 'axios';
import {
  fetchPlanets,
  FetchPlanetRequest,
  fetchPlanetByUrl,
} from '@/api/swapi/planet';
import { Planet } from '@/model/planet';
import { mockPlanet } from '../mocks/mock.planet';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPlanets', () => {
  it('should fetch planets by search term', async () => {
    const searchRequest: FetchPlanetRequest = {
      type: 'search',
      search: 'Tatooine',
    };
    const mockData: Planet[] = [mockPlanet];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPlanets(searchRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/?search=Tatooine',
    );
  });

  it('should fetch planet by id', async () => {
    const getRequest: FetchPlanetRequest = { type: 'get', id: 1 };
    const mockData: Planet[] = [mockPlanet];

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPlanets(getRequest);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/1',
    );
  });

  it('can fetch planet given a url', async () => {
    const url = 'https://swapi.dev/api/planets/1';
    const mockData: Planet = mockPlanet;

    mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await fetchPlanetByUrl(url);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/1',
    );
  });

  it('should handle errors', async () => {
    const searchRequest: FetchPlanetRequest = {
      type: 'search',
      search: 'Tatooine',
    };
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchPlanets(searchRequest)).rejects.toThrow(errorMessage);
  });

  it('should handle errors if URL is given', async () => {
    const url = 'https://swapi.dev/api/planets/1';
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchPlanetByUrl(url)).rejects.toThrow(errorMessage);
  });
});
