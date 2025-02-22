import { Planet } from '@/model/planet';
import { MantineColor } from '@mantine/core';

const CLIMATE_COLORS: { [key: string]: MantineColor } = {
  arid: 'yellow',
  temperate: 'green',
  tropical: 'lime',
  frozen: 'cyan',
  murky: 'grape',
  polluted: 'gray',
  unknown: 'black',
};

export const getColorFromHomeworld = (homeworld?: Planet) => {
  return homeworld ? CLIMATE_COLORS[homeworld?.climate] : 'white';
};
