import axios from 'axios';
import { fetchPeople, FetchPeopleRequest } from '@/api/swapi/person';
import { Person } from '@/model/person';
import { mockPerson } from '../mocks/mock.person';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPeople', () => {
    it('should fetch people by search term', async () => {
        const searchRequest: FetchPeopleRequest = { type: 'search', search: 'Luke' };
        const mockData: Person[] = [mockPerson];

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await fetchPeople(searchRequest);
        expect(result).toEqual(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=Luke');
    });

    it('should fetch person by id', async () => {
        const getRequest: FetchPeopleRequest = { type: 'get', id: 1 };
        const mockData: Person[] = [mockPerson];

        mockedAxios.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await fetchPeople(getRequest);
        expect(result).toEqual(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    });

    it('should handle errors', async () => {
        const searchRequest: FetchPeopleRequest = { type: 'search', search: 'Luke' };
        const errorMessage = 'Network Error';

        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchPeople(searchRequest)).rejects.toThrow(errorMessage);
    });
});