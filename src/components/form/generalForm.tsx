'use client'

import { Container, Fieldset, SimpleGrid } from "@mantine/core";
import { TableFleet } from "../table/tableFleet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Person } from "@/model/person";
import { useState } from "react";
import { PersonInput } from "../inputs/personInput";
import { NavButtons } from "../nav/NavButtons";

export const GeneralForm: React.FC = () => {
    const [general, setGeneral] = useState<Person>();
    const fleet = useSelector((state: RootState) => state.assignment.assignments);

    const isValid = Boolean(fleet.find(ship => ship.general));

    return (
        <Container fluid>
            <NavButtons 
                prev={{url: '/composition'}} 
                next={{url: '/complete', 
                    isValid, 
                    invalidMessage: 'Please assign at least one general to a ship'
            }} />
            <SimpleGrid cols={{base: 1, sm: 2}} spacing='md'>
                <Fieldset legend="Find general" miw={540}>
                    <PersonInput value={general} onChange={setGeneral} />
                </Fieldset>
                <Fieldset legend="Your fleet">
                    <TableFleet assignments={fleet} canAssignGeneral={Boolean(general)} newGeneral={general}/>
                </Fieldset>
            </SimpleGrid>
        </Container>
    );
}