'use client'

import { Container, Textarea, TextInput } from "@mantine/core";
import { ChangeEventHandler } from "react";
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
    const detailStore = useSelector((state: RootState) => state.detail);
    const dispatch = useDispatch();
    
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (event) => {
        event.preventDefault();
        switch(event.currentTarget.name) {
            case 'fleetName':
                dispatch(setName(event.currentTarget.value));
                break;
            case 'description':
                dispatch(setDescription(event.currentTarget.value));
                break;
            case 'commander':
                const commander = await mockGetCommander(event.currentTarget.value);
                dispatch(setCommander(commander));
                break;
        }
    }

    return (
        <Container>
            <fieldset>
                <label>Details</label>
                <TextInput label='name' name='fleetName' data-testid='fleetName' onChange={handleChange} value={detailStore.name} required type='text' placeholder='Name' />
                <Textarea label='description' name='description' data-testid='description' onChange={handleChange} value={detailStore.description} required placeholder='description' />
            </fieldset>

            {/*commander && <CardPerson person={commander} />*/}
            <CardPerson person={detailStore.commander || mockRandomSpeciesPeople[2]} />

            <pre>{JSON.stringify(detailStore)}</pre>
        </Container>
    );
}
