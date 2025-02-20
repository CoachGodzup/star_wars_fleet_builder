'use client'

import { Container, Fieldset, SimpleGrid, Paper, Flex, TextInput, Text, Pagination, Center, Loader, Stack } from "@mantine/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TableFleet } from "../table/tableFleet";
import { Starship } from "@/model/starship";
import { SelectableCardStarship } from "../inputs/selectableCardStarship";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { addShip, reset } from "@/store/assignmentReducer";
import { IconSearch } from "@tabler/icons-react";
import { fetchStarships } from "@/api/swapi/starship";

export const CompositionForm: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState<1 | 2 | 3 | 4>(1);
    const [totalPage, setTotalPage] = useState(4);
    const [totalResults, setTotalResults] = useState(0);

    const [isLoading, setLoading] = useState(false);
    const [starshipList, setStarshipList] = useState<Starship[]>([]);

    const fleetShips = useSelector((state: RootState) => state.assignment.assignments);
    const dispatch = useDispatch();

    const getShipList = (search = '', page?: 1 | 2 | 3 | 4) => {
        return fetchStarships({
            type: 'search', 
            search,
            page,
        });
    }

    useEffect(() => {
        const fetchShips = async () => {
            setLoading(true);
            const newShipList = await getShipList(search, page);
            setTotalPage(Math.ceil(newShipList.count / 10))
            setStarshipList(newShipList.results);
            setTotalResults(newShipList.count);
            setLoading(false);    
        }
        fetchShips();
    }, [page, search])

    const addStarship = useCallback((ship: Starship) => {
        dispatch(addShip(ship));
    }, [dispatch]);

    const resetStarships = () => {
        dispatch(reset());
    };

    const shipList = useMemo(() => starshipList.map((ship, i) => (
        <SelectableCardStarship key={ship.url + i} starship={ship} onClick={addStarship} />
    )), [starshipList, addStarship]);

    const shipSelector = (
        <Stack>
            <TextInput
                leftSectionPointerEvents={'none'}
                leftSection={<IconSearch size={16} />}
                placeholder="e.g. 'Death Star', 'wing'"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Text>{totalResults} result{totalResults !== 1 ? 's' : ''} found.</Text>
            { isLoading ? <Center>
                    <Loader size={60} />
                </Center> : 
                <SimpleGrid cols={2} spacing='md'>
                    {shipList}
                </SimpleGrid>}
            <Center>
                <Pagination 
                    total={totalPage}
                    value={page}
                    onChange={(num) => setPage(num as 1 | 2 | 3 | 4)}>
                </Pagination>
            </Center>
        </Stack>
    );

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