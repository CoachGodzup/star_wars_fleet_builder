import { RootState } from '@/store/rootStore';
import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Text,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { Image } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import { STEP_URLS } from '@/store/navStore';

export const NavGuard = () => {
  const lastValidStep = useSelector(
    (state: RootState) => state.nav.lastValidStep,
  );
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleRouter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(STEP_URLS[lastValidStep]);
  };

  return (
    <Container>
      <Center>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Card.Section>
            <Image
              src='/bestie-force-star-wars.gif'
              height={160}
              alt='Stop! No, you stop!'
            />
          </Card.Section>

          <Group justify='space-between' mt='md' mb='xs'>
            <Text fw={500}>Stop!</Text>
          </Group>

          <Text size='sm' c='dimmed'>
            You are in the wrong place.
          </Text>

          <Button
            color='blue'
            fullWidth
            mt='md'
            radius='md'
            onClick={handleRouter}
            leftSection={<>🤚🏻</>}
            rightSection={
              isLoading ? <Loader size={16} color='white' /> : <></>
            }
          >
            Force push me in the right page
          </Button>
        </Card>
      </Center>
    </Container>
  );
};
