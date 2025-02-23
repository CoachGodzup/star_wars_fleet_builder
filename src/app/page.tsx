import { CardMessage } from '@/components/card/cardMessage';
import { Center, Container } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

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
                    <>
                      <p>
                        Here you can build your own fleet and assign generals to
                        ships.
                      </p>
                      <p>Join us, and we can rule the galaxy!</p>
                    </>
                  }
                  gif='/star-wars-hello.gif'
                  alt='hello there!'
                  leftSection={<IconChevronRight />}
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
