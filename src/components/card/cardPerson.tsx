import { Person } from '@/model/person';
import { Group, Avatar, Text, Loader } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import { fetchPlanetByUrl } from '@/api/swapi/planet';
import { fetchSpeciesByUrl } from '@/api/swapi/species';
import { dateFormatter } from '@/utils/date-formatter';

interface CardPersonProps {
    person: Person
}

const CardPerson: React.FC<CardPersonProps> = ({ person }) => {
    // TODO fetch data from API and not here
    const [isLoadingPlanet, setLoadingPlanet] = React.useState(false);
    const [planet, setPlanet] = React.useState<string | null>(null);

    const [isLoadingSpecies, setLoadingSpecies] = React.useState(false);
    const [species, setSpecies] = React.useState<string | null>(null);

    const getHomeworldInfos = useCallback(async () => {
      setLoadingPlanet(true);
      const result = await fetchPlanetByUrl(person.homeworld);
      setPlanet(result.name);
      setLoadingPlanet(false);
    }, [person.homeworld]);

    const getSpeciesInfos = useCallback(async () => {
      setLoadingSpecies(true);
      if(person.species.length === 0) {
        setSpecies('Human');
      } else {
        const results = (await Promise.all(person.species.map(speciesUrl => fetchSpeciesByUrl(speciesUrl)))).flatMap(species => species.name);
        setSpecies(results.join(', '));  
      }
      setLoadingSpecies(false);
    }, [person.species]);

    useEffect(() => {
      getHomeworldInfos();
      getSpeciesInfos();
    }, [getHomeworldInfos, getSpeciesInfos]);

    return (
    <Group wrap="nowrap">
      <Avatar
        size={94}
        radius="md"
        color='initials'
      />
      <div>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          {isLoadingPlanet ? <Loader size={12} /> : planet}
        </Text>

        <Text fz="lg" fw={500}>
          {person.name}
        </Text>

        <Group wrap="nowrap" gap={10} mt={3}>
          <Text fz="xs" c="dimmed">
            {dateFormatter(person.birth_year)}
          </Text>
        </Group>

        <Group wrap="nowrap" gap={10} mt={3}>
          <Text fz="xs" c="dimmed">
            {person.gender}
          </Text>
        </Group>

        <Group wrap="nowrap" gap={10} mt={5}>
          <Text fz="xs" c="dimmed">
            {isLoadingSpecies ? <Loader size={12} /> : species}
          </Text>
        </Group>
      </div>

    </Group>
    );
};

export default CardPerson;