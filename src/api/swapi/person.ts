import axios from 'axios';
import { Person } from "@/model/person";
import { Planet } from '@/model/planet';
import { Species } from '@/model/species';

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
                const speciesInfo = await Promise.all(person.species.map(spec => axios.get<Species>(spec)))
                person.speciesInfo = speciesInfo.map(elm => elm.data);

                const homeworldInfo = await axios.get<Planet>(person.homeworld)
                person.homeworldInfo = homeworldInfo.data

                resolve(response.data);
            });
        } catch (error) {
            reject(error);
        }
    })
};
