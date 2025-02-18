import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import GlobalForm from '@/components/globalForm';

describe('Global Form Component', () => {
    it('renders the form', () => {
        render(<GlobalForm onSubmit={() => {}} />);

        const fleetName = screen.getByTestId('fleetName');
        const description = screen.getByTestId('description');
        const commander = screen.getByTestId('commander');

        expect(fleetName).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(commander).toBeInTheDocument();
    });

    test('submits the form with correct data', () => {
        const handleSubmit = jest.fn();
        render(<GlobalForm onSubmit={handleSubmit} />);

        const fleetName = screen.getByTestId('fleetName');
        const description = screen.getByTestId('description');
        const commander = screen.getByTestId('commander');
        const submit = screen.getByTestId('submit');

        fireEvent.change(fleetName, { target: { value: 'Test Fleet' } });
        fireEvent.change(description, { target: { value: 'Test Description' } });
        fireEvent.change(commander, { target: { value: 'Test Commander' } });

        submit.click();

        expect(handleSubmit).toHaveBeenCalledWith({
            fleetName: 'Test Fleet',
            description: 'Test Description',
            commander: 'Test Commander'
        });
    });

    test.skip('shows validation errors', () => {
        expect(false).toBe(true);
    });
});