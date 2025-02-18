'use client';

import React from 'react';
import { DetailForm, DetailFormInputs } from './detailForm';


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
    const [detailForm, setDetailForm] = React.useState<DetailFormInputs>({fleetName: '', description: '', commander: ''});

    const [shipNumber, setShipNumber] = React.useState('0');

    const [general, setGeneral] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.elements);
        onSubmit({
            ...detailForm,
            shipNumber,
            general,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <DetailForm state={detailForm} setState={setDetailForm} />
            </fieldset>
            <pre>{JSON.stringify(detailForm)}</pre>
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