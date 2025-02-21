'use client'

import { Container, Fieldset, Textarea, TextInput } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { Person } from "@/model/person";
import { useDispatch, useSelector } from "react-redux";
import { setName, setDescription, setCommander } from "@/store/detailReducer";
import { RootState } from "@/store/rootStore";
import { PersonInput } from "../inputs/personInput";

export const DetailForm: React.FC = () => {
    // TODO https://mantine.dev/form/validation/

    const detailStore = useSelector((state: RootState) => state.detail);
    const dispatch = useDispatch();
    
    const handleCommander = (commander: Person) => {
        dispatch(setCommander(commander))
    }

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (event) => {
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
        <Container miw={400}>
            <Fieldset legend='Details'>
                <TextInput label='name' name='fleetName' data-testid='fleetName' onChange={handleChange} value={detailStore.name} required type='text' placeholder='Name' />
                <Textarea label='description' name='description' data-testid='description' onChange={handleChange} value={detailStore.description} required placeholder='description' />
                <PersonInput label='commander' name='commander' data-testid='commander' limit={5}
                    onChange={handleCommander} value={detailStore.commander} required placeholder='commander'></PersonInput>
            </Fieldset>
        </Container>
    );
}
