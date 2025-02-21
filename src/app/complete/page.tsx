'use client'

import { Badge, Button, Card, Center, Container, Group, Image, Text } from '@mantine/core';
import React from 'react';

export const CompletePage: React.FC = () => {
    return (
        <Container fluid>
            <Center>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="/star-wars-admiral-ackbar.gif"
                        height={160}
                        alt="It's a trap!"
                        />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Complete!</Text>
                </Group>

                <Text size="sm" c="dimmed">
                    Thank you for your submission.
                </Text>
                </Card>
            </Center>
        </Container>
    );
};

export default CompletePage;