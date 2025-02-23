import { Center, Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

type PrevButtonProps = {
  url: string;
  label?: string;
};

type NextButtonProps = {
  url: string;
  label?: string;
  debounce?: number;
  type?: 'submit' | 'button';
  isValid: boolean;
  invalidMessage: string;
  onLoading?: () => void;
  onClick?: () => void;
};

export type NavButtonsProps = {
  prev?: PrevButtonProps;
  next: NextButtonProps;
};

export const NavButtons: React.FC<NavButtonsProps> = ({ prev, next }) => {
  const router = useRouter();

  const handlePrev = () => {
    if (prev) {
      router.push(prev.url);
    }
  };

  const handleNext = () => {
    if (next.isValid) {
      if (next.onLoading) {
        next.onLoading();
      }
      setTimeout(() => {
        if (next.onClick) {
          next.onClick();
        }
        router.push(next.url);
      }, next.debounce || 0);
    } else {
      notifications.show({
        title: 'Aw, ships!',
        message: next.invalidMessage,
        color: 'red',
        withCloseButton: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <Center>
      <Group pt={10}>
        {prev ? (
          <Button onClick={handlePrev}>{prev.label || 'Prev'}</Button>
        ) : (
          <></>
        )}
        {next ? (
          <Button onClick={handleNext} type={next.type || 'button'}>
            {next.label || 'Next'}
          </Button>
        ) : (
          <></>
        )}
      </Group>
    </Center>
  );
};
