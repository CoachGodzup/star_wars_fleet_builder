'use client';

import { CardMessage } from '@/components/card/cardMessage';
import { Center, Container } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <section>
        <Container fluid>
          <Center>
            <Container>
              <Center>
                <CardMessage
                  title='Welcome to Star Wars Fleet Builder!'
                  message={
                    <div>
                      <div>
                        Here you can build your own fleet and assign generals to
                        ships.
                      </div>
                      <div>Join us, and we can rule the galaxy!</div>
                    </div>
                  }
                  gif='/star-wars-hello.gif'
                  alt='hello there!'
                  buttonText='General Kenobi!'
                  href='/detail'
                />
              </Center>
            </Container>
          </Center>
        </Container>
      </section>
    </main>
  );
}
