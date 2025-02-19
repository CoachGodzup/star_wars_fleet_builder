import axios from 'axios';
import { fetchStarships, FetchStarshipRequest, fetchAllStarships, STARSHIPS_PER_PAGE, ALL_STARSHIPS_PAGES } from '@/api/swapi/starship';
import { Starship } from '@/model/starship';
import { mockStarship } from '../mocks/mock.starship';
import { starshipList } from '../mocks/mock.starship.list';

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

    it('should fetch starship by page number', async () => {
        const getRequest: FetchStarshipRequest = { type: 'page', id: 2 };
        const mockData: Starship[] = [...starshipList];

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await fetchStarships(getRequest);
        expect(result).toEqual(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/?page=2');
    });

    it('should fetch all starships', async () => {
        const mockData: Starship[] = starshipList;

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const calls = Array.from({ length: ALL_STARSHIPS_PAGES }, (_, i) => {
            return `https://swapi.dev/api/starships/?page=${i + 1}`;
        });

        const result = await fetchAllStarships();
        expect(mockedAxios.get).toHaveBeenCalledTimes(ALL_STARSHIPS_PAGES);//(`https://swapi.dev/api/starships/?page=${i}`);
        // expect(mockedAxios.get).toHaveBeenNthCalledWith(4, ...calls);//(`https://swapi.dev/api/starships/?page=${i}`);

        expect(result.length).toEqual(STARSHIPS_PER_PAGE * ALL_STARSHIPS_PAGES);
    });


    it('should handle errors', async () => {
        const searchRequest: FetchStarshipRequest = { type: 'search', search: 'Millennium Falcon' };
        const errorMessage = 'Network Error';

        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchStarships(searchRequest)).rejects.toThrow(errorMessage);
    });
});