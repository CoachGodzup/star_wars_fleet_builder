'use client';

import React from 'react';
import { GeneralForm } from '@/components/form/generalForm';
import { Container } from '@mantine/core';
import { NavGuard } from '@/components/guard/navGuard';
import { useCheckValidity } from '@/hooks/useCheckValidity';
import { Step } from '@/store/navStore';

const GeneralPage: React.FC = () => {
  const isValidPage = useCheckValidity(Step.general);

  return <Container>{isValidPage ? <GeneralForm /> : <NavGuard />}</Container>;
};

export default GeneralPage;
