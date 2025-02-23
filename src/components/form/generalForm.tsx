'use client';

import {
  Container,
  Fieldset,
  Loader,
  Modal,
  Portal,
  SimpleGrid,
} from '@mantine/core';
import { TableFleet } from '../table/tableFleet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootStore';
import { Person } from '@/model/person';
import { useState } from 'react';
import { PersonInput } from '../inputs/personInput';
import { NavButtons } from '../nav/NavButtons';
import { setStep, Step } from '@/store/navStore';
import { CardMessage } from '../card/cardMessage';
import { IconSpeakerphone } from '@tabler/icons-react';

export const GeneralForm: React.FC = () => {
  const [general, setGeneral] = useState<Person>();
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const fleet = useSelector((state: RootState) => state.assignment.assignments);

  const isValid = Boolean(fleet.find((ship) => ship.general));

  const handleNext = () => {
    if (isValid) {
      dispatch(setStep(Step.complete));
    }
  };

  return (
    <>
      <Container fluid>
        <NavButtons
          prev={{ url: '/composition' }}
          next={{
            url: '/complete',
            debounce: 5000, // mock backend call
            isValid,
            invalidMessage: 'Please assign at least one general to a ship',
            onLoading: () => setModalOpen(true),
            onClick: handleNext,
          }}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
          <Fieldset legend='Find general'>
            <PersonInput value={general} onChange={setGeneral} />
          </Fieldset>
          <Fieldset legend='Your fleet'>
            <TableFleet
              assignments={fleet}
              canAssignGeneral={Boolean(general)}
              newGeneral={general}
            />
          </Fieldset>
        </SimpleGrid>
      </Container>
      <Portal>
        <Modal
          opened={isModalOpen}
          onClose={() => setModalOpen(false)}
          withCloseButton={false}
        >
          <CardMessage
            gif='/star-wars-light.gif'
            alt='Jump into lightspeed!'
            title='Jump into lightspeed!'
            message={
              <div>
                <p>
                  <Loader size={16} mr={16} color='white' />
                  {`Please standby while we're preparing your fleet`}
                </p>
              </div>
            }
            buttonText='Motivate the troops!'
            leftSection={<IconSpeakerphone />}
            onClick={() => {}}
          ></CardMessage>
        </Modal>
      </Portal>
    </>
  );
};
