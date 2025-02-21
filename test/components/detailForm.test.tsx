import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { DetailForm } from '@/components/form/detailForm';
import { render } from '../test-utils/render';
import { DetailStoreData } from '@/store/detailReducer';

describe('Detail Form Component', () => {
  it('renders the form', () => {
    render(<DetailForm />);

    const fleetName = screen.getByTestId('name');
    const description = screen.getByTestId('description');
    const commander = screen.getByTestId('commander');

    expect(fleetName).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(commander).toBeInTheDocument();
  });

  it.skip('updates the form with correct data', () => {
    const state: DetailStoreData = {
      name: '',
      description: '',
    };
    const setState = jest.fn();

    render(<DetailForm />);
    const fleetName = screen.getByTestId('name');
    const description = screen.getByTestId('description');
    const commander = screen.getByTestId('commander');

    fireEvent.change(fleetName, { target: { value: 'Test Fleet' } });
    fireEvent.change(description, { target: { value: 'Test Description' } });
    fireEvent.change(commander, { target: { value: 'Test Commander' } });

    expect(setState).toHaveBeenCalledWith({
      ...state,
      fleetName: 'Test Fleet',
    });

    expect(setState).toHaveBeenCalledWith({
      ...state,
      description: 'Test Description',
    });

    expect(setState).toHaveBeenCalledWith({
      ...state,
      commander: 'Test Commander',
    });
  });

  test.skip('shows validation errors', () => {
    expect(false).toBe(true);
  });
});
