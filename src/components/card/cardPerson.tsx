'use client';

import { Person } from '@/model/person';
import { Group, Avatar, Text, Loader, Paper } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import { fetchSpeciesByUrl } from '@/api/swapi/species';
import { dateFormatter } from '@/utils/date-formatter';
import {
  IconCookieMan,
  IconRobot,
  IconUser,
  IconUserFilled,
  IconWoman,
} from '@tabler/icons-react';
import { Homeworld } from './cardAsyncComponents/homeworld';

interface CardPersonProps {
  person: Person;
}
const ICON_SIZE = 80;

const CardPerson: React.FC<CardPersonProps> = ({ person }) => {
  // TODO fetch data from API and not here
  const [isLoadingSpecies, setLoadingSpecies] = React.useState(false);
  const [species, setSpecies] = React.useState<string | null>(null);

  const getSpeciesInfos = useCallback(async () => {
    setLoadingSpecies(true);
    if (person.species.length === 0) {
      setSpecies('Human');
    } else {
      const results = (
        await Promise.all(
          person.species.map((speciesUrl) => fetchSpeciesByUrl(speciesUrl)),
        )
      ).flatMap((species) => species.name);
      setSpecies(results.join(', '));
    }
    setLoadingSpecies(false);
  }, [person.species]);

  useEffect(() => {
    getSpeciesInfos();
  }, [getSpeciesInfos]);

  const getAvatarIconFromSpecies = useCallback(() => {
    if (species === 'Human') {
      return person.gender === 'female' ? (
        <IconWoman size={ICON_SIZE} />
      ) : (
        <IconUser size={ICON_SIZE}></IconUser>
      );
    } else if (species === 'Droid') {
      return <IconRobot size={ICON_SIZE}></IconRobot>;
    } else if (species === 'Wookie') {
      return <IconUserFilled size={ICON_SIZE}></IconUserFilled>;
    }
    return <IconCookieMan size={ICON_SIZE}></IconCookieMan>;
  }, [species, person]);

  return (
    <Paper withBorder p='md' mt={20} miw={300}>
      <Group wrap='nowrap'>
        <Avatar size={94} radius='md' name={person.name} color={'initials'}>
          {getAvatarIconFromSpecies()}
        </Avatar>
        <div>
          <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
            <Homeworld person={person}></Homeworld>
          </Text>

          <Text fz='lg' fw={500}>
            {person.name}
          </Text>

          <Group wrap='nowrap' gap={10} mt={3}>
            <Text fz='xs' c='dimmed'>
              {dateFormatter(person.birth_year)}
            </Text>
          </Group>

          <Group wrap='nowrap' gap={10} mt={3}>
            <Text fz='xs' c='dimmed'>
              {person.gender}
            </Text>
          </Group>

          <Group wrap='nowrap' gap={10} mt={5}>
            <Text fz='xs' c='dimmed'>
              {isLoadingSpecies ? <Loader size={12} /> : species}
            </Text>
          </Group>
        </div>
      </Group>
    </Paper>
  );
};

export default CardPerson;
