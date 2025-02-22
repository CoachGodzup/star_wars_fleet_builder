'use client';

import { NavGuard } from '@/components/guard/navGuard';
import { Card, Center, Container, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { useCheckValidity } from '@/hooks/useCheckValidity';
import { Step } from '@/store/navStore';

const CompletePage: React.FC = () => {
  const isValidPage = useCheckValidity(Step.complete);

  return (
    <Container fluid>
      {isValidPage ? (
        <Center>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section>
              <Image
                src='/star-wars-admiral-ackbar.gif'
                height={160}
                alt="It's a trap!"
              />
            </Card.Section>

            <Group justify='space-between' mt='md' mb='xs'>
              <Text fw={500}>Complete!</Text>
            </Group>

            <Text size='sm' c='dimmed'>
              Thank you for your submission.
            </Text>
          </Card>
        </Center>
      ) : (
        <NavGuard />
      )}
    </Container>
  );
};

export default CompletePage;
