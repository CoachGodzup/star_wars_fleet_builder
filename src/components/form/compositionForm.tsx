'use client'

import { Container, Fieldset, SimpleGrid, Paper, Flex } from "@mantine/core";
import React, { useMemo } from "react";
import { starshipList } from "../../../test/mocks/mock.starship.list";
import { TableFleet } from "../table/tableFleet";
import { Starship } from "@/model/starship";
import { SelectableCardStarship } from "../inputs/selectableCardStarship";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { addShip, reset } from "@/store/assignmentReducer";

export const CompositionForm: React.FC = () => {
    const fleetShips = useSelector((state: RootState) => state.assignment.assignments);
    const dispatch = useDispatch();

    const addStarship = (ship: Starship) => {
        dispatch(addShip(ship));
    };

    const resetStarships = () => {
        dispatch(reset());
    };

    const shipSelector = useMemo(() => (
        <SimpleGrid cols={2} spacing='md'>
            {starshipList.map((ship, i) => <SelectableCardStarship key={ship.url + i} starship={ship} onClick={addStarship}></SelectableCardStarship>)}
        </SimpleGrid>
    ), [starshipList, addStarship]);

    return (
        <Container fluid>
            <SimpleGrid cols={2} spacing='md'>
                <Fieldset legend="Fleet Composition">
                    {shipSelector}
                </Fieldset>
                <Paper withBorder p='md'>
                    <Flex justify='end'>
                        <button onClick={resetStarships}>Reset</button>
                    </Flex>
                    <TableFleet assignments={fleetShips} />
                </Paper>
            </SimpleGrid>
        </Container>
    );
}