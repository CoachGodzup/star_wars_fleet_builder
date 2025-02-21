'use client'

import { Container, Fieldset, SimpleGrid } from "@mantine/core";
import { TableFleet } from "../table/tableFleet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Person } from "@/model/person";
import { useState } from "react";
import { PersonInput } from "../inputs/personInput";

export const GeneralForm: React.FC = () => {
    const [general, setGeneral] = useState<Person>();
    const fleet = useSelector((state: RootState) => state.assignment.assignments);

    return (
        <Container fluid>
            <SimpleGrid cols={{base: 1, sm: 2}} spacing='md'>
                <Fieldset legend="Search general" miw={540}>
                    <PersonInput value={general} onChange={setGeneral} />
                </Fieldset>
                <Fieldset legend="Your fleet">
                    <TableFleet assignments={fleet} canAssignGeneral={Boolean(general)} newGeneral={general}/>
                </Fieldset>
            </SimpleGrid>
        </Container>
    );
}