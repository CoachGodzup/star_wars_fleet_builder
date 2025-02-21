'use client'

import { Container, Fieldset, Paper, Textarea, TextInput } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import CardPerson from "../card/cardPerson";
import { Person } from "@/model/person";
import { useDispatch, useSelector } from "react-redux";
import { setName, setDescription, setCommander } from "@/store/detailReducer";
import { RootState } from "@/store/rootStore";
import { searchPerson } from "@/api/swapi/person";
import { mockRandomSpeciesPeople } from "../../../test/mocks/mock.person.list";
import { PersonInput } from "../inputs/personInput";

export const DetailForm: React.FC = () => {
    // TODO https://mantine.dev/form/validation/
    const [commanderName, setCommanderName] = useState('');
    const [commanderList, setCommanderList] = useState<Person[]>([]);

    const detailStore = useSelector((state: RootState) => state.detail);
    const dispatch = useDispatch();
    
    const handleCommanderName = async (search: string) => {
        setCommanderName(search);

        const commanderList = await searchPerson({type: 'search', search});
        setCommanderList(commanderList);

        const foundedCommander = commanderList.find(c => c.name === search)
        if(foundedCommander) {
            dispatch(setCommander(foundedCommander))
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (event) => {
        event.preventDefault();
        switch(event.currentTarget.name) {
            case 'fleetName':
                dispatch(setName(event.currentTarget.value));
                break;
            case 'description':
                dispatch(setDescription(event.currentTarget.value));
                break;
        }
    }

    return (
        <Container>
            <Fieldset legend='Details'>
                <TextInput label='name' name='fleetName' data-testid='fleetName' onChange={handleChange} value={detailStore.name} required type='text' placeholder='Name' />
                <Textarea label='description' name='description' data-testid='description' onChange={handleChange} value={detailStore.description} required placeholder='description' />

                <PersonInput label='commander' name='commander' data-testid='commander' limit={5}
                    onChange={handleCommanderName} value={commanderName} required placeholder='commander' 
                    data={commanderList.map(c => c.name)}></PersonInput>
                
                <Paper withBorder p='md' mt={20}>
                    <CardPerson person={detailStore.commander || mockRandomSpeciesPeople[2]} />
                </Paper>
            </Fieldset>
        </Container>
    );
}
