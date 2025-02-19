'use client'

import { Container, Fieldset, SimpleGrid, Paper, Flex, Group, TextInput, Input } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { starshipList } from "../../../test/mocks/mock.starship.list";
import { TableFleet } from "../table/tableFleet";
import { Starship } from "@/model/starship";
import { SelectableCardStarship } from "../inputs/selectableCardStarship";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { addShip, reset } from "@/store/assignmentReducer";
import { IconSearch } from "@tabler/icons-react";

export const CompositionForm: React.FC = () => {
    const [shipFilter, setShipFilter] = useState('');
    const [filteredShipList, setFilteredShipList] = useState(starshipList);
    const fleetShips = useSelector((state: RootState) => state.assignment.assignments);
    const dispatch = useDispatch();

    useEffect(() => {
        setFilteredShipList([...starshipList.filter(elm => elm.name.toLowerCase().includes(shipFilter.toLowerCase()))])
    }, [shipFilter])

    const addStarship = (ship: Starship) => {
        dispatch(addShip(ship));
    };

    const resetStarships = () => {
        dispatch(reset());
    };

    const shipList = useMemo(() => filteredShipList.map((ship, i) => <SelectableCardStarship key={ship.url + i} starship={ship} onClick={addStarship}></SelectableCardStarship>), [filteredShipList]);

    const shipSelector = <Group>
        <TextInput leftSectionPointerEvents={'none'} leftSection={<IconSearch size={16}></IconSearch>} placeholder="e.g. 'death star', 'wing'" value={shipFilter} onChange={(event) => setShipFilter(event.currentTarget.value)} />
        <SimpleGrid cols={2} spacing='md'>
            {shipList}
        </SimpleGrid>
    </Group>

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