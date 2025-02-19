'use client'

import { Container, Fieldset, Paper, Textarea, TextInput } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import CardPerson from "../card/cardPerson";
import { mockPeople, mockRandomSpeciesPeople } from "../../../test/mocks/mock.person.list";
import { Person } from "@/model/person";
import { useDispatch, useSelector } from "react-redux";
import { setName, setDescription, setCommander } from "@/store/detailReducer";
import { RootState } from "@/store/rootStore";

const mockGetCommander = (search: string): Promise<Person> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [...mockPeople, ...mockRandomSpeciesPeople].find(p => p.name === search) || mockRandomSpeciesPeople[2]
            )
        }, 100);
    });
}

export const DetailForm: React.FC = () => {
    // TODO https://mantine.dev/form/validation/
    const [commanderName, setCommanderName] = useState('');

    const detailStore = useSelector((state: RootState) => state.detail);
    const dispatch = useDispatch();
    
    const handleCommanderName = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommanderName(event.currentTarget.value);
        const commander = await mockGetCommander(event.currentTarget.value);
        dispatch(setCommander(commander));
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
                <TextInput label='commander' name='commander' data-testid='commander' onChange={handleCommanderName} value={commanderName} required placeholder='commander' />
            
                <Paper withBorder p='md' mt={20}>
                    <CardPerson person={detailStore.commander || mockRandomSpeciesPeople[2]} />
                </Paper>
            </Fieldset>

            {/*commander && <CardPerson person={commander} />*/}

            <pre>{JSON.stringify(detailStore)}</pre>
        </Container>
    );
}
