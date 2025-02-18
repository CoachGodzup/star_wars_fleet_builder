import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { DetailForm, DetailFormInputs } from '@/components/detailForm';
import { render } from '../test-utils/render';

describe('Detail Form Component', () => {
    it('renders the form', () => {
        const state: DetailFormInputs = {
            fleetName: '',
            description: '',
            commander: '',
        }
        const setState = jest.fn();

        render(<DetailForm state={state} setState={setState} />);

        const fleetName = screen.getByTestId('fleetName');
        const description = screen.getByTestId('description');
        const commander = screen.getByTestId('commander');

        expect(fleetName).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(commander).toBeInTheDocument();
    });

    test('updates the form with correct data', () => {
        const state: DetailFormInputs = {
            fleetName: '',
            description: '',
            commander: '',
        }
        const setState = jest.fn();

        render(<DetailForm state={state} setState={setState} />);
        const fleetName = screen.getByTestId('fleetName');
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