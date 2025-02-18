import axios from 'axios';
import { Planet } from '@/model/planet';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type SearchPlanetRequest = {
    type: 'search';
    search: string;
}

type GetPlanetRequest = {
    type: 'get'
    id: number;
}

export type FetchPlanetRequest = SearchPlanetRequest | GetPlanetRequest;

export const fetchPlanets: (req: FetchPlanetRequest) => Promise<Planet[]> = (request)  => {
    return new Promise(async (resolve, reject) => {
        try {
            const URI = request.type === 'search' ? `${SWAPI_BASE_URL}/planets/?search=${request.search}` : `${SWAPI_BASE_URL}/planets/${request.id}`;

            const response = await axios.get<Planet[]>(URI);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};
