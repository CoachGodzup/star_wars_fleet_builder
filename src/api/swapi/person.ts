import { Person } from '@/model/person';
import { Planet } from '@/model/planet';
import { Species } from '@/model/species';
import { SwapiMultipleResponse } from '@/model/swapiMultipleResponse';
import { cacheable } from '../cache';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

export type SearchPersonRequest = {
  type: 'search';
  search: string;
  page?: number;
};

export type GetPersonRequest = {
  type: 'get';
  id: number;
};

export const fetchPerson: (req: GetPersonRequest) => Promise<Person[]> = (
  request,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URI = `${SWAPI_BASE_URL}/people/${request.id}`;

      const response = await cacheable<Person[]>(URI);

      // failsafe information enrichment
      try {
        response.map(async (person) => {
          const speciesInfo = await Promise.all(
            person.species.map((spec) => cacheable<Species>(spec)),
          );
          person.speciesInfo = speciesInfo.map((elm) => elm);

          const homeworldInfo = await cacheable<Planet>(person.homeworld);
          person.homeworldInfo = homeworldInfo;
        });
      } finally {
        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const searchPerson: (req: SearchPersonRequest) => Promise<Person[]> = (
  request,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URI = `${SWAPI_BASE_URL}/people/?search=${request.search}`;

      const response = await cacheable<SwapiMultipleResponse<Person>>(URI);

      resolve(response.results);
    } catch (error) {
      reject(error);
    }
  });
};
