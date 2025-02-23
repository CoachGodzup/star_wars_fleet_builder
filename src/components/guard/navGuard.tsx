'use client';

import { RootState } from '@/store/rootStore';
import { Center, Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { STEP_URLS } from '@/store/navStore';
import { IconHandStop } from '@tabler/icons-react';
import { CardMessage } from '../card/cardMessage';

export const NavGuard = () => {
  const lastValidStep = useSelector(
    (state: RootState) => state.nav.lastValidStep,
  );
  const router = useRouter();

  const handleRouter = () => {
    router.push(STEP_URLS[lastValidStep]);
  };

  return (
    <Container>
      <Center>
        <CardMessage
          gif='/bestie-force-star-wars.gif'
          alt='Stop! No, you stop!'
          title='Stop!'
          buttonType='button'
          message='You are in the wrong place.'
          buttonText='Force push me in the right page'
          onClick={handleRouter}
          leftSection={<IconHandStop size={24} />}
        ></CardMessage>
      </Center>
    </Container>
  );
};
