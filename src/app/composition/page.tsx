'use client';

import { CompositionForm } from '@/components/form/compositionForm';
import { NavGuard } from '@/components/guard/navGuard';
import { useCheckValidity } from '@/hooks/useCheckValidity';
import { Step } from '@/store/navStore';
import React from 'react';

const CompositionPage: React.FC = () => {
  const isValidPage = useCheckValidity(Step.composition);
  return isValidPage ? <CompositionForm /> : <NavGuard />;
};

export default CompositionPage;
