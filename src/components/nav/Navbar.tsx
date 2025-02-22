'use client';

import { setStep } from '@/store/navStore';
import { RootState } from '@/store/rootStore';
import { Stepper } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const STEP_PAGES = ['detail', 'composition', 'general', 'complete'];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const navStore = useSelector((state: RootState) => state.nav);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const step = STEP_PAGES.findIndex((page) => pathname.includes(page));
    setActive(step);
  }, [pathname]);

  const handleStepClick = (step: number) => {
    setActive(step === 3 ? 2 : step);
    dispatch(setStep(step));
    router.push(`/${STEP_PAGES[step]}`);
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
