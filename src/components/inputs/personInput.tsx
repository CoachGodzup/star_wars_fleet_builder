import { searchPerson } from "@/api/swapi/person";
import { Person } from "@/model/person";
import { Autocomplete, AutocompleteProps, CloseButton, InputBaseProps, Loader, Paper, Stack } from "@mantine/core";
import React, { useState } from "react";
import CardPerson from "../card/cardPerson";
import { IconSearch } from "@tabler/icons-react";

export type PersonInputProps = Omit<AutocompleteProps, 'value' | 'onChange' | 'data'> & InputBaseProps & {
    value?: Person;
    onChange?: (person: Person) => void;
};

export const PersonInput: React.FC<PersonInputProps> = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [person, setPerson] = useState<Person | undefined>(props.value);
    const [personList, setPersonList] = useState<Person[]>([]);

    const [isLoading, setLoading] = useState(false);
    
    const handleReset = () => {
        setInputValue('');
        setPerson(undefined);
    }

    const handleChange = async (search: string) => {
        setLoading(true);
        setInputValue(search);

        const commanderList = await searchPerson({type: 'search', search});
        setPersonList(commanderList);

        const founded = commanderList.find(c => c.name === search)
        if (founded) {
            setPerson(founded);
            if (props.onChange) {
                props.onChange(founded);
            }
        }
        setLoading(false);
    }

    return (
        <Stack>
            <Autocomplete 
                {...props}
                value={inputValue} 
                onChange={handleChange} 
                leftSectionPointerEvents="none"
                leftSection={<IconSearch size={16} />}
                rightSection={isLoading ? 
                    <Loader color={'gray'} size={16} /> 
                    : person ? <CloseButton onClick={handleReset} />
                    : <></>}
                data-testid={props.name} 
                data={personList.map(p => p.name)}
                comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}>
            </Autocomplete>
            {person ?
                <Paper withBorder p='md' mt={20} miw={300}>
                    <CardPerson person={person} /> 
                </Paper>
            : <></> }
        </Stack>
    )
}