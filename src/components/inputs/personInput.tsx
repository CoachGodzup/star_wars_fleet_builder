import { Autocomplete, AutocompleteProps, InputBaseProps } from "@mantine/core";
import React from "react";

export type PersonInputProps = AutocompleteProps & InputBaseProps;

export const PersonInput: React.FC<PersonInputProps> = (props) => {
    return (<Autocomplete {...props} data-testid={props.name}></Autocomplete>);
}