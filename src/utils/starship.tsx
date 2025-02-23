import { MantineColor } from '@mantine/core';
import {
  IconPlane,
  IconRocket,
  IconSatellite,
  IconPlanet,
  IconUfo,
} from '@tabler/icons-react';

const ICON_SIZE = 60;

export const CREW_THRESHOLDS = {
  fighter: 2,
  small: 10,
  medium: 500,
  large: 10000,
};

export const getIconByCrew = (crew: number, size = ICON_SIZE) => {
  if (crew < CREW_THRESHOLDS.fighter) {
    return (
      <IconPlane
        data-testid='icon-starship'
        data-icon='plane'
        size={size}
      ></IconPlane>
    );
  }
  if (crew < CREW_THRESHOLDS.small) {
    return (
      <IconRocket
        data-testid='icon-starship'
        data-icon='rocket'
        size={size}
      ></IconRocket>
    );
  }
  if (crew < CREW_THRESHOLDS.medium) {
    return (
      <IconUfo
        data-testid='icon-starship'
        data-icon='ufo'
        size={size}
      ></IconUfo>
    );
  }
  if (crew < CREW_THRESHOLDS.large) {
    return (
      <IconSatellite
        data-testid='icon-starship'
        data-icon='satellite'
        size={size}
      ></IconSatellite>
    );
  }
  return (
    <IconPlanet
      data-testid='icon-starship'
      data-icon='planet'
      size={size}
    ></IconPlanet>
  );
};

export const getColorByCrew = (crew: number): MantineColor => {
  if (crew < CREW_THRESHOLDS.fighter) {
    return 'lime';
  }
  if (crew < CREW_THRESHOLDS.small) {
    return 'cyan';
  }
  if (crew < CREW_THRESHOLDS.medium) {
    return 'teal';
  }
  if (crew < CREW_THRESHOLDS.large) {
    return 'blue';
  }
  return 'grape';
};
