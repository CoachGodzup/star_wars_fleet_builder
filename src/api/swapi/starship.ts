import axios from 'axios';
import { Starship } from "@/model/starship";

const SWAPI_BASE_URL = 'https://swapi.dev/api';
export const ALL_STARSHIPS_PAGES = 4;
export const STARSHIPS_PER_PAGE = 36;

type StarshipPageNumber =  1 | 2 | 3 | 4;

type SearchStarshipRequest = {
    type: 'search';
    search: string;
}

type GetStarshipRequest = {
    type: 'get'
    id: number;
}

type GetPageRequest = {
    type: 'page';
    page: StarshipPageNumber;
}

export type FetchStarshipRequest = SearchStarshipRequest | GetStarshipRequest | GetPageRequest;

const getURI = (request: FetchStarshipRequest) => {
    switch(request.type) { 
        case 'search': return `${SWAPI_BASE_URL}/starships/?search=${request.search}`;
        case 'get': return `${SWAPI_BASE_URL}/starships/${request.id}`;
        case 'page': return `${SWAPI_BASE_URL}/starships/?page=${request.page}`;
    }
}

export const fetchStarships: (req: FetchStarshipRequest) => Promise<Starship[]> = (request)  => {
    return new Promise(async (resolve, reject) => {
        try {
            const URI = getURI(request);
            const response = await axios.get<Starship[]>(URI);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const fetchAllStarships: () => Promise<Starship[]> = async ()  => {
    // Statically, we know we have 4 pages from API

    const promises = Array.from({ length: ALL_STARSHIPS_PAGES }, (_, i) => {
        return fetchStarships({ type: 'page', page: (i + 1) as StarshipPageNumber });
    });

    const results = await Promise.all(promises);
    return results.flat();
};