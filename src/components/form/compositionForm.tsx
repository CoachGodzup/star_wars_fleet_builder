'use client'

import { Container, Fieldset, SimpleGrid, Paper, Flex } from "@mantine/core";
import React, { useCallback, useMemo } from "react";
import { starshipList } from "../../../test/mocks/mock.starship.list";
import { Assignment } from "@/model/assignment";
import { TableFleet } from "../table/tableFleet";
import { Starship } from "@/model/starship";
import { SelectableCardStarship } from "../inputs/selectableCardStarship";

export const CompositionForm: React.FC = () => {
    const [fleetShips, setFleetShips] = React.useState<Assignment[]>([]);

    const addShip = useCallback((ship: Starship) => {
        setFleetShips([...fleetShips, { starship: ship }]);
    }, [fleetShips]);

    const resetShips = useCallback(() => {
        setFleetShips([]);
    }, []);

    const shipSelector = useMemo(() => (
        <SimpleGrid cols={2} spacing='md'>
            {starshipList.map((ship, i) => <SelectableCardStarship key={ship.url + i} starship={ship} onClick={addShip}></SelectableCardStarship>)}
        </SimpleGrid>
    ), [starshipList, addShip]);

    return (
        <Container fluid>
            <SimpleGrid cols={2} spacing='md'>
                <Fieldset legend="Fleet Composition">
                    {shipSelector}
                </Fieldset>
                <Paper withBorder p='md'>
                    <Flex justify='end'>
                        <button onClick={resetShips}>Reset</button>
                    </Flex>
                    <TableFleet assignments={fleetShips} />
                </Paper>
            </SimpleGrid    >
        </Container>
    );
}