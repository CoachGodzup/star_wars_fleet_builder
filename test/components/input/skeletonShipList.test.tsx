import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonShipList } from '../../../src/components/inputs/skeletonShipList';
import { MantineProvider } from '@mantine/core';

describe('SkeletonShipList', () => {
  it('renders the correct number of skeletons', () => {
    const length = 5;
    const { container } = render(
      <MantineProvider>
        <SkeletonShipList length={length} />
      </MantineProvider>,
    );
    const skeletons = container.querySelectorAll('.mantine-Skeleton-root');
    expect(skeletons.length).toBe(length);
  });
});
