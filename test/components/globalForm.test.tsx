import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import GlobalForm from '@/components/globalForm';

describe('Global Form Component', () => {
    it('renders the form', () => {
        render(<GlobalForm onSubmit={() => {}} />);

        const fleetName = screen.getByTestId('fleetName');
        const description = screen.getByTestId('description');
        const commander = screen.getByTestId('commander');

        const shipNumber = screen.getByTestId('composition');

        const general = screen.getByTestId('general');

        expect(fleetName).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(commander).toBeInTheDocument();
        expect(shipNumber).toBeInTheDocument();
        expect(general).toBeInTheDocument();
    });

    test('submits the form with correct data', () => {
        const handleSubmit = jest.fn();
        render(<GlobalForm onSubmit={handleSubmit} />);

        const fleetName = screen.getByTestId('fleetName');
        const description = screen.getByTestId('description');
        const commander = screen.getByTestId('commander');
        const shipNumber = screen.getByTestId('composition');
        const general = screen.getByTestId('general');

        const submit = screen.getByTestId('submit');

        fireEvent.change(fleetName, { target: { value: 'Test Fleet' } });
        fireEvent.change(description, { target: { value: 'Test Description' } });
        fireEvent.change(commander, { target: { value: 'Test Commander' } });
        fireEvent.change(shipNumber, { target: { value: '1' } });
        fireEvent.change(general, { target: { value: 'Test General' } });

        submit.click();

        expect(handleSubmit).toHaveBeenCalledWith({
            fleetName: 'Test Fleet',
            description: 'Test Description',
            commander: 'Test Commander',
            shipNumber: '1',
            general: 'Test General'
        });
    });

    test.skip('shows validation errors', () => {
        expect(false).toBe(true);
    });
});