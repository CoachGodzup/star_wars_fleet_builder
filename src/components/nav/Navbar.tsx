'use client';

import { STEP_URLS } from '@/store/navStore';
import { RootState } from '@/store/rootStore';
import { Stepper } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Navbar: React.FC = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const navStore = useSelector((state: RootState) => state.nav);
  const pathname = usePathname();

  useEffect(() => {
    const step = STEP_URLS.findIndex((page) => pathname.includes(page));
    setActive(step);
  }, [pathname]);

  const handleStepClick = (step: number) => {
    router.push(STEP_URLS[step]);
  };

  return (
    <Stepper active={active} onStepClick={handleStepClick}>
      <Stepper.Step
        label='Fleet details'
        description={'Basic infos'}
        disabled={navStore.lastValidStep < 1}
      ></Stepper.Step>
      <Stepper.Step
        label='Fleet composition'
        description='Prepare some ships'
        disabled={navStore.lastValidStep < 2}
      ></Stepper.Step>
      <Stepper.Step
        label='Fleet general'
        description='Add some heroes'
        disabled={navStore.lastValidStep < 3}
      ></Stepper.Step>
      <Stepper.Completed> </Stepper.Completed>
    </Stepper>
  );
};
