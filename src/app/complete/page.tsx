'use client';

import { NavGuard } from '@/components/guard/navGuard';
import {
  Text,
  Center,
  Container,
  Stack,
  Title,
  Modal,
  Portal,
  Fieldset,
} from '@mantine/core';
import React from 'react';
import { useCheckValidity } from '@/hooks/useCheckValidity';
import { Step } from '@/store/navStore';
import { TableFleet } from '@/components/table/tableFleet';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootStore';
import CardPerson from '@/components/card/cardPerson';
import { CardMessage } from '@/components/card/cardMessage';

const CompletePage: React.FC = () => {
  const isValidPage = useCheckValidity(Step.complete);
  const [isModalOpen, setModalOpen] = React.useState(true);
  const fleet = useSelector((state: RootState) => state.assignment.assignments);
  const detail = useSelector((state: RootState) => state.detail);

  return (
    <>
      <Container fluid>
        <Center>
          {isValidPage ? (
            <Fieldset legend='your fleet'>
              <Stack>
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
              </Stack>
            </Fieldset>
          ) : (
            <NavGuard />
          )}
        </Center>
      </Container>
      <Portal>
        <Modal
          opened={isModalOpen && isValidPage}
          onClose={() => setModalOpen(false)}
          withCloseButton={false}
          closeOnEscape
        >
          <CardMessage
            gif='/star-wars-admiral-ackbar.gif'
            alt="It's a trap!"
            title='Fleet launched!'
            message={
              <div>
                <p>{`Thank you for your submission. Your fleet is on route for a new adventure!`}</p>
              </div>
            }
            buttonText='Dismiss'
            onClick={() => setModalOpen(false)}
          ></CardMessage>
        </Modal>
      </Portal>
    </>
  );
};

export default CompletePage;
