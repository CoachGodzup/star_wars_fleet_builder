import axios from 'axios';
import { Starship } from "@/model/starship";

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type SearchStarshipRequest = {
    type: 'search';
    search: string;
}

type GetStarshipRequest = {
    type: 'get'
    id: number;
}

export type FetchStarshipRequest = SearchStarshipRequest | GetStarshipRequest;

export const fetchStarships: (req: FetchStarshipRequest) => Promise<Starship[]> = (request)  => {
    return new Promise(async (resolve, reject) => {
        try {
            const URI = request.type === 'search' ? `${SWAPI_BASE_URL}/starships/?search=${request.search}` : `${SWAPI_BASE_URL}/starships/${request.id}`;

            const response = await axios.get<Starship[]>(URI);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};