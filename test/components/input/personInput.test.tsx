import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PersonInput } from '@/components/inputs/personInput';
import { mockPeople } from '../../mocks/mock.person.list';
import { searchPerson } from '@/api/swapi/person';

jest.mock('@/api/swapi/person');

describe('PersonInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing, and displays initial value if provided', () => {
    render(<PersonInput value={mockPeople[0]} />);
    expect(screen.getByDisplayValue(mockPeople[0].name)).toBeInTheDocument();
  });

  it('calls searchPerson API on input change', async () => {
    (searchPerson as jest.Mock).mockResolvedValue(mockPeople);

    render(<PersonInput />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Luke' } });

    await waitFor(() => {
      expect(searchPerson).toHaveBeenCalledWith({
        type: 'search',
        search: 'Luke',
      });
    });
  });

  it('displays loader while fetching data', async () => {
    (searchPerson as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<PersonInput />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays autocomplete options based on search results', async () => {
    (searchPerson as jest.Mock).mockResolvedValue(mockPeople);

    render(<PersonInput />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Skywalker' } });

    await waitFor(() => {
      mockPeople.forEach((person) => {
        expect(screen.getByText(person.name)).toBeInTheDocument();
      });
    });
  });

  it('displays selected person details when an option is selected', async () => {
    (searchPerson as jest.Mock).mockResolvedValue(mockPeople);

    render(<PersonInput />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Luke Skywalker'));
    });

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('resets input and selected person on reset button click', async () => {
    (searchPerson as jest.Mock).mockResolvedValue(mockPeople);

    render(<PersonInput />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Luke Skywalker'));
    });

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    expect(screen.queryByText('male')).not.toBeInTheDocument();
    expect(screen.queryByText('19BBY')).not.toBeInTheDocument();
  });
});
