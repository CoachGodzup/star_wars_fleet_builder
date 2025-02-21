import { Center, Container } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section>
        <Container fluid>
          <Center>
            <Link href='/detail'>{"Let's Start"}</Link>
          </Center>
        </Container>
      </section>
    </main>
  );
}
