'use client';

import { ButtonProps, Button, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ButtonWithLoaderBasicProps = ButtonProps & {
  type: 'submit' | 'button';
};

type ButtonWithLoaderLinkProps = ButtonWithLoaderBasicProps & {
  href: string;
};

type ButtonWithLoaderButtonProps = ButtonWithLoaderBasicProps & {
  href: null;
  onClick: () => void | Promise<void>;
};

type ButtonWithLoaderProps =
  | ButtonWithLoaderButtonProps
  | ButtonWithLoaderLinkProps;

const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
  children,
  type = 'button',
  ...props
}) => {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    if ('href' in props && props.href) {
      router.push(props.href);
    } else if ('onClick' in props) {
      await props.onClick();
      setLoading(false);
    }
  };

  return (
    <Button
      {...props}
      type={type}
      onClick={handleClick}
      leftSection={props.leftSection}
      rightSection={isLoading ? <Loader size={16} color='white' /> : <></>}
    >
      {children}
    </Button>
  );
};

export default ButtonWithLoader;
