import axios from 'axios';
import { Person } from "@/model/person";
import { Planet } from '@/model/planet';
import { Species } from '@/model/species';
import { SwapiMultipleResponse } from '@/model/swapiMultipleResponse';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type SearchPersonRequest = {
    type: 'search';
    search: string;
    page?: number;
}

type GetPersonRequest = {
    type: 'get'
    id: number;
}

export const fetchPerson: (req: GetPersonRequest) => Promise<Person[]> = (request)  => {
    return new Promise( async (resolve, reject) => {
        try {
            const URI = `${SWAPI_BASE_URL}/people/${request.id}`;

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

export const searchPerson: (req: SearchPersonRequest) => Promise<Person[]> = (request)  => {
    return new Promise( async (resolve, reject) => {
        try {
            const URI = `${SWAPI_BASE_URL}/people/?search=${request.search}`;

            const response = await axios.get<SwapiMultipleResponse<Person>>(URI);
            
            resolve(response.data.results);
            /*const output = await response.data.results.map(async (person) => {
                // TODO species
                const speciesInfo = await Promise.all(person.species.map(spec => axios.get<Species>(spec)))
                person.speciesInfo = speciesInfo.map(elm => elm.data);

                const homeworldInfo = await axios.get<Planet>(person.homeworld)
                person.homeworldInfo = homeworldInfo.data

            });
            resolve(output);*/
        } catch (error) {
            reject(error);
        }
    })
};
