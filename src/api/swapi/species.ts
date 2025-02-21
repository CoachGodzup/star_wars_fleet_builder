import { Species } from '@/model/species';
import { cacheable } from '../cache';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type GetSpeciesRequest = {
  type: 'get';
  id: string;
};

export type FetchSpeciesRequest = GetSpeciesRequest;

export const fetchSpecies: (req: FetchSpeciesRequest) => Promise<Species[]> = (
  request,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URI = `${SWAPI_BASE_URL}/species/${request.id}`;

      const response = await cacheable<Species[]>(URI);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchSpeciesByUrl: (url: string) => Promise<Species> = (url) => {
  return cacheable(url);
};
