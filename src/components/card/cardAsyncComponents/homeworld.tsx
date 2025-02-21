import { fetchPlanetByUrl } from '@/api/swapi/planet';
import { Person } from '@/model/person';
import { Planet } from '@/model/planet';
import { Loader } from '@mantine/core';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

type HomeworldProps = {
  person: Person;
};

export const Homeworld: React.FC<HomeworldProps> = ({ person }) => {
  const [isLoadingPlanet, setLoadingPlanet] = useState(false);
  const [planet, setPlanet] = React.useState<Planet>();

  const getHomeworldInfos = useCallback(async () => {
    setLoadingPlanet(true);
    const result = await fetchPlanetByUrl(person.homeworld);
    setPlanet(result);
    setLoadingPlanet(false);
  }, [person.homeworld]);

  useEffect(() => {
    getHomeworldInfos();
  }, [getHomeworldInfos]);

  return isLoadingPlanet ? <Loader size={12} /> : planet?.name;
};
