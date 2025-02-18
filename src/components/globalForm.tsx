import React from 'react';

export type DetailFormProps = {
    fleetName: string;
    description: string;
    commander: string;
}

export type CompositionFormProps = {}

export type GeneralFormProps = {
    general: string;
}

type GlobalFormProps = {
    onSubmit: (data: DetailFormProps) => void;
}

const GlobalForm: React.FC<GlobalFormProps> = ({onSubmit}) => {
    const [fleetName, setFleetName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [commander, setCommander] = React.useState('');

    // const [shipNumber, setShipNumber] = React.useState(0);

//    const [general, setGeneral] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.elements);
        onSubmit({
            fleetName,
            description,
            commander
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>Details</label>
                <input name='fleetName' value={fleetName} required onChange={(elm) => setFleetName(elm.currentTarget.value)} data-testid="fleetName" type='text' placeholder='Name' />
                <input name='description' value={description} required onChange={(elm) => setDescription(elm.currentTarget.value)} data-testid="description" type='text' placeholder='description' />
                <input name='commander' value={commander} required onChange={(elm) => setCommander(elm.currentTarget.value)} data-testid="commander" type='text' placeholder='commander' />
            </fieldset>
            <fieldset>
                <label>Composition</label>
                {/* add multiple choice from a list */}
                <input name='ship-number' data-testid='composition' type='number' placeholder='ship-number' />
            </fieldset>
            <fieldset>
                <label>General</label>
                <input name='general' data-testid='general' type='text' placeholder='general' />
            </fieldset>
            <fieldset>
                <input type="submit" data-testid='submit' value="Create" />
            </fieldset>
        </form>

    );
};

export default GlobalForm;