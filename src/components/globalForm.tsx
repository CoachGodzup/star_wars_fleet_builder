import React from 'react';

export type DetailFormInputs = {
    fleetName: string;
    description: string;
    commander: string;
}

export type CompositionFormInputs = {
    shipNumber: string;
}

export type GeneralFormInputs = {
    general: string;
}

export type GlobalFormInputs = DetailFormInputs & CompositionFormInputs & GeneralFormInputs;

type GlobalFormProps = {
    onSubmit: (data: GlobalFormInputs) => void;
}

const GlobalForm: React.FC<GlobalFormProps> = ({onSubmit}) => {
    const [fleetName, setFleetName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [commander, setCommander] = React.useState('');

    const [shipNumber, setShipNumber] = React.useState('0');

    const [general, setGeneral] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.elements);
        onSubmit({
            fleetName,
            description,
            commander,
            shipNumber,
            general,
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
                <input name='ship-number' value={shipNumber} required onChange={(elm) => setShipNumber(elm.currentTarget.value)} data-testid='composition' type='string' placeholder='ship-number' />
            </fieldset>
            <fieldset>
                <label>General</label>
                <input name='general' value={general} required onChange={(elm) => setGeneral(elm.currentTarget.value)} data-testid='general' type='text' placeholder='general' />
            </fieldset>
            <fieldset>
                <input type="submit" data-testid='submit' value="Create" />
            </fieldset>
        </form>

    );
};

export default GlobalForm;