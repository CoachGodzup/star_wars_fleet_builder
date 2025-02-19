import { Starship } from "@/model/starship"
import { CardStarship } from "../card/cardStarship"
import { Paper } from "@mantine/core"

type SelectableCardStarshipProps = {
    starship: Starship,
    onClick: (ship: Starship) => void, 
}

export const SelectableCardStarship: React.FC<SelectableCardStarshipProps> = ({starship, onClick}) => {
    return <Paper withBorder p="md" shadow="sm" style={{cursor: 'pointer'}} onClick={() => onClick(starship)}>
        <CardStarship starship={starship}></CardStarship>
    </Paper>
}