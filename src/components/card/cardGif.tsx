'use client';

import { Card, Image } from '@mantine/core';
import React from 'react';

type CardGifProps = {
  gif: string;
  alt: string;
};

export const CardGif: React.FC<CardGifProps> = ({ gif, alt }) => (
  <Card.Section>
    <Image src={gif} height={160} width={200} alt={alt} />
  </Card.Section>
);
