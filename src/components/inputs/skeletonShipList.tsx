import { Skeleton, Paper } from '@mantine/core';
import React from 'react';

type SkeletonShipListProps = {
  length: number;
};

export const SkeletonShipList: React.FC<SkeletonShipListProps> = ({
  length,
}) => {
  return Array(length)
    .fill(null)
    .map((_, i) => (
      <Skeleton key={i}>
        <Paper p={16} w={300} h={108} />
      </Skeleton>
    ));
};
