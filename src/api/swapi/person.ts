import axios from 'axios';
import { Person } from "@/model/person";
import { Planet } from '@/model/planet';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type SearchPeopleRequest = {
    type: 'search';
    search: string;
}

type GetPersonRequest = {
    type: 'get'
    id: number;
}

export type FetchPeopleRequest = SearchPeopleRequest | GetPersonRequest;

export const fetchPeople: (req: FetchPeopleRequest) => Promise<Person[]> = (request)  => {
    return new Promise( async (resolve, reject) => {
        try {
            const URI = request.type === 'search' ? `${SWAPI_BASE_URL}/people/?search=${request.search}` : `${SWAPI_BASE_URL}/people/${request.id}`;

            const response = await axios.get<Person[]>(URI);
            
            response.data.map(async (person) => {
                // TODO species

                const planetPromise = axios.get<Planet>(person.homeworld).then((planetResponse) => {
                    person.homeworld = planetResponse.data.name;
                });

                await Promise.all([planetPromise]);
                console.log(person);
                resolve(response.data);
            });
        } catch (error) {
            reject(error);
        }
    })
};
