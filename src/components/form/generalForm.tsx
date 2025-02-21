'use client'

import { Container, Fieldset } from "@mantine/core";
import { TableFleet } from "../table/tableFleet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

export const GeneralForm: React.FC = () => {
    const fleet = useSelector((state: RootState) => state.assignment.assignments);

    return (
        <Container fluid>
            <Fieldset legend="Assign Generals">
                <TableFleet assignments={fleet} canAssignGeneral/>
            </Fieldset>
        </Container>


    );
}