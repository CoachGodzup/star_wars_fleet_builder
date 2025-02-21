import { fetchStarships } from '@/api/swapi/starship';
import { Starship } from '@/model/starship';
import {
  Stack,
  TextInput,
  Loader,
  SimpleGrid,
  Center,
  Pagination,
  Text,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { SelectableCardStarship } from './selectableCardStarship';
import { SkeletonShipList } from './skeletonShipList';

type ShipSelectorProps = {
  onElementClick: (ship: Starship) => void;
};

export const ShipSelector: React.FC<ShipSelectorProps> = ({
  onElementClick,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState<1 | 2 | 3 | 4>(1);
  const [totalPage, setTotalPage] = useState(4);
  const [totalResults, setTotalResults] = useState(0);
  const [starshipList, setStarshipList] = useState<Starship[]>([]);

  const getShipList = (search = '', page?: 1 | 2 | 3 | 4) => {
    return fetchStarships({
      type: 'search',
      search,
      page,
    });
  };

  useEffect(() => {
    const fetchShips = async () => {
      setLoading(true);
      const newShipList = await getShipList(search, page);
      setTotalPage(Math.ceil(newShipList.count / 10));
      setStarshipList(newShipList.results);
      setTotalResults(newShipList.count);
      setLoading(false);
    };
    fetchShips();
  }, [page, search]);

  const shipList = useMemo(
    () =>
      starshipList.map((ship, i) => (
        <SelectableCardStarship
          key={ship.url + i}
          starship={ship}
          onClick={onElementClick}
        />
      )),
    [starshipList, onElementClick],
  );

  return (
    <Stack>
      <TextInput
        leftSectionPointerEvents={'none'}
        leftSection={<IconSearch size={16} />}
        rightSectionPointerEvents={'none'}
        rightSection={isLoading ? <Loader size={16} /> : <></>}
        placeholder="e.g. 'Death Star', 'wing'"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Text>
        {totalResults} result{totalResults !== 1 ? 's' : ''} found.
      </Text>
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='md'>
        {isLoading ? <SkeletonShipList length={6} /> : shipList}
      </SimpleGrid>
      <Center>
        <Pagination
          total={totalPage}
          value={page}
          onChange={(num) => setPage(num as 1 | 2 | 3 | 4)}
        ></Pagination>
      </Center>
    </Stack>
  );
};
