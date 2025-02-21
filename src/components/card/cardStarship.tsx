import { Starship } from '@/model/starship';
import { getColorByCrew, getIconByCrew } from '@/utils/starship';
import { Group, Avatar, Text } from '@mantine/core';

export type CardStarshipProps = {
  starship: Starship;
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
