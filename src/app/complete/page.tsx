'use client';

import { NavGuard } from '@/components/guard/navGuard';
import { Text, Center, Container, Fieldset, Stack, Title } from '@mantine/core';
import React from 'react';
import { useCheckValidity } from '@/hooks/useCheckValidity';
import { Step } from '@/store/navStore';
import { TableFleet } from '@/components/table/tableFleet';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootStore';
import { CardMessage } from '@/components/card/cardMessage';
import CardPerson from '@/components/card/cardPerson';

const CompletePage: React.FC = () => {
  const isValidPage = useCheckValidity(Step.complete);
  const fleet = useSelector((state: RootState) => state.assignment.assignments);
  const detail = useSelector((state: RootState) => state.detail);

  return (
    <Container fluid>
      <Center>
        {isValidPage ? (
          <Stack>
            <CardMessage
              title='Fleet launched!'
              message='Thank you for your submission.'
              gif='/star-wars-admiral-ackbar.gif'
              alt="It's a trap!"
              buttonText='Start over'
              href='/'
            />
            <Fieldset legend='Your fleet'>
              <div>
                <Title order={3}>{detail.name}</Title>
                <Text>{detail.description}</Text>
              </div>
              <div>
                <Title order={4}>Commander: </Title>
                {detail.commander ? (
                  <CardPerson person={detail.commander} />
                ) : (
                  <></>
                )}
              </div>
              <div>
                <Title order={4}>Fleet: </Title>
                <TableFleet assignments={fleet} />
              </div>
            </Fieldset>
          </Stack>
        ) : (
          <NavGuard />
        )}
      </Center>
    </Container>
  );
};

export default CompletePage;
