import { Starship } from '@/model/starship';
import { Group, Avatar, Text, MantineColor } from '@mantine/core';
import {
  IconPlane,
  IconPlanet,
  IconRocket,
  IconSatellite,
  IconSend,
} from '@tabler/icons-react';

export type CardStarshipProps = {
  starship: Starship;
};

const CREW_THRESHOLDS = {
  fighter: 2,
  small: 10,
  medium: 500,
  large: 10000,
};

const ICON_SIZE = 60;

const getIconByCrew = (crew: number) => {
  if (crew < CREW_THRESHOLDS.fighter) {
    return <IconPlane size={ICON_SIZE}></IconPlane>;
  }
  if (crew < CREW_THRESHOLDS.small) {
    return <IconRocket size={ICON_SIZE}></IconRocket>;
  }
  if (crew < CREW_THRESHOLDS.medium) {
    return <IconSend size={ICON_SIZE}></IconSend>;
  }
  if (crew < CREW_THRESHOLDS.large) {
    return <IconSatellite size={ICON_SIZE}></IconSatellite>;
  }
  return <IconPlanet size={ICON_SIZE}></IconPlanet>;
};
const getColorByCrew = (crew: number): MantineColor => {
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

export const CardStarship: React.FC<CardStarshipProps> = ({ starship }) => {
  return (
    <Group wrap='nowrap'>
      <Avatar
        size={94}
        radius='md'
        color={getColorByCrew(Number(starship.crew))}
      >
        {getIconByCrew(Number(starship.crew))}
      </Avatar>
      <div>
        <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
          {starship.starship_class}
        </Text>

        <Text fz='lg' fw={500}>
          {starship.name}
        </Text>

        <Group wrap='nowrap' gap={10} mt={3}>
          <Text fz='xs' c='dimmed'>
            Model: {starship.model}
          </Text>
        </Group>

        <Group wrap='nowrap' gap={10} mt={3}>
          <Text fz='xs' c='dimmed'>
            Crew: {starship.crew}
          </Text>
        </Group>
      </div>
    </Group>
  );
};
