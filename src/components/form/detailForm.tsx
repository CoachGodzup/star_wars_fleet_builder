import { Container, Textarea, TextInput } from "@mantine/core";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ApiAutocomplete } from "../inputs/apiAutocomplete";
import { fetchPeople } from "@/api/swapi/person";
import CardPerson from "../card/cardPerson";
import { mockPeople, mockRandomSpeciesPeople } from "../../../test/mocks/mock.person.list";
import { Person } from "@/model/person";

export type DetailFormInputs = {
    fleetName: string;
    description: string;
    commander: string;
}

export type DetailFormProps = {
    state: DetailFormInputs;
    setState: (state: DetailFormInputs) => void;
}

export const DetailForm: React.FC<DetailFormProps> = ({state, setState}) => {
    const [commander, setCommander] = useState<Person | null>(null);
    
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    }

    useEffect(() => {
        setCommander(mockPeople.find(p => p.name === state.commander) || null);
    }, [state.commander]);

    return (
        <Container>
            <fieldset>
                <label>Details</label>
                <TextInput label='name' name='fleetName' data-testid='fleetName' onChange={handleChange} value={state.fleetName} required type='text' placeholder='Name' />
                <Textarea label='description' name='description' data-testid='description' onChange={handleChange} value={state.description} required placeholder='description' />
                {/*<ApiAutocomplete value={state.commander} onChange={(value) => setState({...state, commander: value})} apiCall={fetchPeople()} />*/}       
                <TextInput name='commander' data-testid='commander' onChange={handleChange} value={state.commander} required type='text' placeholder='commander' />
            </fieldset>

            {/*commander && <CardPerson person={commander} />*/}
            <CardPerson person={commander || mockRandomSpeciesPeople[2]} />
        </Container>
    );
}
