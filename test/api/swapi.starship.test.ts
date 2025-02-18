import axios from 'axios';
import { fetchStarships, FetchStarshipRequest } from '@/api/swapi/starship';
import { Starship } from '@/model/starship';
import { mockStarship } from '../mocks/mock.starship';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchStarships', () => {
    it('should fetch starships by search term', async () => {
        const searchRequest: FetchStarshipRequest = { type: 'search', search: 'Millennium Falcon' };
        const mockData: Starship[] = [mockStarship];

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await fetchStarships(searchRequest);
        expect(result).toEqual(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/?search=Millennium Falcon');
    });

    it('should fetch starship by id', async () => {
        const getRequest: FetchStarshipRequest = { type: 'get', id: 10 };
        const mockData: Starship[] = [mockStarship];

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await fetchStarships(getRequest);
        expect(result).toEqual(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/10');
    });

    it('should handle errors', async () => {
        const searchRequest: FetchStarshipRequest = { type: 'search', search: 'Millennium Falcon' };
        const errorMessage = 'Network Error';

        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchStarships(searchRequest)).rejects.toThrow(errorMessage);
    });
});