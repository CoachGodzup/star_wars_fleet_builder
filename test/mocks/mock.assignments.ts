import { mockRandomSpeciesPeople } from "./mock.person.list";
import { mockStarship } from "./mock.starship";
import { starshipList } from "./mock.starship.list";

export const mockAssignments = [{
    starship: mockStarship
}, {
    starship: starshipList[3],
    general: mockRandomSpeciesPeople[2]
},{
    starship: mockStarship
}, {
    starship: starshipList[2],
    general: mockRandomSpeciesPeople[0]   
}]