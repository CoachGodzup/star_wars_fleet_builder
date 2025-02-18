import { Assignment } from "./assignment";
import { Person } from "./person";
import { Starship } from "./starship";

export type Fleet = {
    name: string;
    description: string;
    commander: Person;
    composition: Starship[];
    generals: Assignment[] ;
}