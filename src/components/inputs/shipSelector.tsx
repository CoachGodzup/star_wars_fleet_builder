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
import { useEffect, useMemo, useReducer } from 'react';
import { SelectableCardStarship } from './selectableCardStarship';
import { SkeletonShipList } from './skeletonShipList';
import { SwapiMultipleResponse } from '@/model/swapiMultipleResponse';

const getShipList = (search = '', page?: 1 | 2 | 3 | 4) => {
  return fetchStarships({
    type: 'search',
    search,
    page,
  });
};

type ShipSelectorProps = {
  onElementClick: (ship: Starship) => void;
};

export const ShipSelector: React.FC<ShipSelectorProps> = ({
  onElementClick,
}) => {
  const initialState = {
    isLoading: false,
    search: '',
    page: 1 as 1 | 2 | 3 | 4,
    totalPage: 4,
    totalResults: 0,
    starshipList: [] as Starship[],
  };

  type State = typeof initialState;

  type Action =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_SEARCH'; payload: string }
    | { type: 'SET_PAGE'; payload: 1 | 2 | 3 | 4 }
    | { type: 'SET_STARSHIP_LIST'; payload: SwapiMultipleResponse<Starship> };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'SET_SEARCH':
        return { ...state, search: action.payload };
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_STARSHIP_LIST':
        return {
          ...state,
          starshipList: action.payload.results,
          totalPage: Math.ceil(action.payload.count / 10),
          totalResults: action.payload.count,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchShips = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newShipList = await getShipList(state.search, state.page);
      dispatch({ type: 'SET_STARSHIP_LIST', payload: newShipList });
      dispatch({ type: 'SET_LOADING', payload: false });
    };
    fetchShips();
  }, [state.page, state.search]);

  const shipList = useMemo(
    () =>
      state.starshipList.map((ship, i) => (
        <SelectableCardStarship
          key={ship.url + i}
          starship={ship}
          onClick={onElementClick}
        />
      )),
    [state.starshipList, onElementClick],
  );

  return (
    <Stack>
      <TextInput
        leftSectionPointerEvents={'none'}
        leftSection={<IconSearch size={16} />}
        rightSectionPointerEvents={'none'}
        rightSection={state.isLoading ? <Loader size={16} /> : <></>}
        placeholder="e.g. 'Death Star', 'wing'"
        value={state.search}
        onChange={(event) =>
          dispatch({ type: 'SET_SEARCH', payload: event.currentTarget.value })
        }
      />
      <Text>
        {state.totalResults} result{state.totalResults !== 1 ? 's' : ''} found.
      </Text>
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='md'>
        {state.isLoading ? <SkeletonShipList length={6} /> : shipList}
      </SimpleGrid>
      <Center>
        <Pagination
          total={state.totalPage}
          value={state.page}
          onChange={(num) =>
            dispatch({ type: 'SET_PAGE', payload: num as 1 | 2 | 3 | 4 })
          }
        ></Pagination>
      </Center>
    </Stack>
  );
};
