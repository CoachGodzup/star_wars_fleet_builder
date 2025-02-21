'use client';

import { Stepper } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const STEP_PAGES = ['detail', 'composition', 'general', 'complete'];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const step = STEP_PAGES.findIndex((page) => pathname.includes(page));
    setActive(step);
  }, [pathname]);

  const handleStepClick = (step: number) => {
    setActive(step === 3 ? 2 : step);
    router.push(`/${STEP_PAGES[step]}`);
  };

  return (
    <Stepper active={active} onStepClick={handleStepClick}>
      <Stepper.Step
        label='Fleet details'
        description='Basic infos'
      ></Stepper.Step>
      <Stepper.Step
        label='Fleet composition'
        description='Prepare some ships'
      ></Stepper.Step>
      <Stepper.Step
        label='Fleet general'
        description='Add some heroes'
      ></Stepper.Step>
      <Stepper.Completed>Completed</Stepper.Completed>
    </Stepper>
  );
};
