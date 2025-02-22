import { RootState } from '../store/rootStore';
import { useSelector } from 'react-redux';

export const useCheckValidity = (page: number) => {
  const state = useSelector((state: RootState) => state.nav);

  console.log(
    'useCheckValidity',
    state.lastValidStep,
    page,
    !(page > state.lastValidStep),
  );
  return !(page > state.lastValidStep);
};
