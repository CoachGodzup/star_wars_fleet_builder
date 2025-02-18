import { TextInput } from "@mantine/core";
import { ChangeEventHandler } from "react";

export type DetailFormInputs = {
    fleetName: string;
    description: string;
    commander: string;
}

export type DetailFormProps = {
    state: DetailFormInputs;
    setState: (state: DetailFormInputs) => void;
}

export const DetailForm: React.FC<DetailFormProps> = ({state, setState}) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    }

    return (
        <form>
            <label>Details</label>
            <TextInput name='fleetName' data-testid='fleetName' onChange={handleChange} value={state.fleetName} required type='text' placeholder='Name' />
            <TextInput name='description' data-testid='description' onChange={handleChange} value={state.description} required type='text' placeholder='description' />
            <TextInput name='commander' data-testid='commander' onChange={handleChange} value={state.commander} required type='text' placeholder='commander' />
        </form>
    );
}
