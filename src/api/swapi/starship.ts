import { Starship } from '@/model/starship';
import { SwapiMultipleResponse } from '@/model/swapiMultipleResponse';
import { cacheable } from '../cache';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type StarshipPageNumber = 1 | 2 | 3 | 4;

type SearchStarshipRequest = {
  type: 'search';
  page?: StarshipPageNumber;
  search: string;
};

type GetStarshipRequest = {
  type: 'get';
  id: number;
};

export type FetchStarshipRequest = SearchStarshipRequest | GetStarshipRequest;

const getURI = (request: FetchStarshipRequest) => {
  switch (request.type) {
    case 'search':
      return `${SWAPI_BASE_URL}/starships/?search=${request.search}${request.page ? '&page=' + request.page : ''}`;
    case 'get':
      return `${SWAPI_BASE_URL}/starships/${request.id}`;
  }
};

export const fetchStarships: (
  req: FetchStarshipRequest,
) => Promise<SwapiMultipleResponse<Starship>> = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URI = getURI(request);
      const response = await cacheable<SwapiMultipleResponse<Starship>>(URI);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
