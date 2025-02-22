'use client';

import { Container, Fieldset, SimpleGrid, Flex } from '@mantine/core';
import React, { useCallback } from 'react';
import { TableFleet } from '../table/tableFleet';
import { Starship } from '@/model/starship';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootStore';
import { addShip, reset } from '@/store/assignmentReducer';
import { NavButtons } from '../nav/NavButtons';
import { ShipSelector } from '../inputs/shipSelector';
import { setStep, Step } from '@/store/navStore';

export const CompositionForm: React.FC = () => {
  const fleetShips = useSelector(
    (state: RootState) => state.assignment.assignments,
  );
  const dispatch = useDispatch();

  const addStarship = useCallback(
    (ship: Starship) => {
      dispatch(addShip(ship));
    },
    [dispatch],
  );

  const resetStarships = () => {
    dispatch(reset());
  };

  return (
    <Container fluid>
      <NavButtons
        prev={{ url: '/detail' }}
        next={{
          url: '/general',
          isValid: fleetShips.length > 0,
          invalidMessage: 'Please add at least one starship to your fleet',
          onClick: () => {
            dispatch(setStep(Step.general));
          },
        }}
      />
      <SimpleGrid cols={2} spacing='md'>
        <Fieldset legend='Add starships'>
          <ShipSelector onElementClick={addStarship} />
        </Fieldset>
        <Fieldset legend='Your fleet'>
          <Flex justify='end'>
            <button onClick={resetStarships}>Reset</button>
          </Flex>
          <TableFleet assignments={fleetShips} canRemove />
        </Fieldset>
      </SimpleGrid>
    </Container>
  );
};
