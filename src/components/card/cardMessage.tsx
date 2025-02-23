import { Card, Group, Text } from '@mantine/core';
import { CardGif } from './cardGif';
import { ReactNode } from 'react';
import ButtonWithLoader from '../nav/ButtonWithLoader';

type CardMessageBasicProps = {
  gif: string;
  alt: string;
  title: string;
  buttonType?: 'submit' | 'button';
  message: string | ReactNode;
  buttonText: string;
  leftSection?: ReactNode;
};

type CardMessageLinkProps = CardMessageBasicProps & {
  href: string;
};

type CardMessageButtonProps = CardMessageBasicProps & {
  onClick: () => void | Promise<void>;
};

type CardMessageProps = CardMessageButtonProps | CardMessageLinkProps;

export const CardMessage: React.FC<CardMessageProps> = ({
  gif,
  alt,
  title,
  message,
  buttonType = 'button',
  buttonText,
  leftSection = null,
  ...props
}) => (
  <Card shadow='sm' padding='lg' radius='md' withBorder>
    <CardGif gif={gif} alt={alt} />

    <Group justify='space-between' mt='md' mb='xs'>
      <Text fw={500}>{title}</Text>
    </Group>

    <Text size='sm' c='dimmed' component='div'>
      {message}
    </Text>

    <ButtonWithLoader
      color='blue'
      fullWidth
      mt='md'
      radius='md'
      type={buttonType}
      onClick={'onClick' in props ? props.onClick : () => {}}
      href={'href' in props ? props.href : null}
      leftSection={leftSection}
    >
      {buttonText}
    </ButtonWithLoader>
  </Card>
);
