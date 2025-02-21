import axios from 'axios';
import { Planet } from '@/model/planet';
import { cacheable } from '../cache';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type SearchPlanetRequest = {
  type: 'search';
  search: string;
};

type GetPlanetRequest = {
  type: 'get';
  id: number;
};

export type FetchPlanetRequest = SearchPlanetRequest | GetPlanetRequest;

export const fetchPlanets: (req: FetchPlanetRequest) => Promise<Planet[]> = (
  request,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URI =
        request.type === 'search'
          ? `${SWAPI_BASE_URL}/planets/?search=${request.search}`
          : `${SWAPI_BASE_URL}/planets/${request.id}`;

      const response = await cacheable<Planet[]>(URI);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPlanetByUrl: (url: string) => Promise<Planet> = (url) => {
  return cacheable<Planet>(url);
};
