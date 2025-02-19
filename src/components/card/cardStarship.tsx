import { Starship } from "@/model/starship";
import { Group, Avatar, Text, MantineColor } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";

export type CardStarshipProps = {
    starship: Starship;
};

const getColorByCrew = (crew: number): MantineColor => {
    if (crew < 10) {
        return 'cyan';
    } else if (crew < 500) {
        return 'teal';
    } else if (crew < 10000) {
        return 'blue';
    }
    return 'grape';
};

export const CardStarship: React.FC<CardStarshipProps> = ({ starship }) => {
    return (
        <Group wrap="nowrap">
            <Avatar
                size={94}
                radius="md"
                color={getColorByCrew(Number(starship.crew))}
            >
                <IconRocket size={60} />
            </Avatar>
            <div>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    {starship.starship_class}
                </Text>

                <Text fz="lg" fw={500}>
                    {starship.name}
                </Text>

                <Group wrap="nowrap" gap={10} mt={3}>
                    <Text fz="xs" c="dimmed">
                        Model: {starship.model}
                    </Text>
                </Group>

                <Group wrap="nowrap" gap={10} mt={3}>
                    <Text fz="xs" c="dimmed">
                        Crew: {starship.crew}
                    </Text>
                </Group>
            </div>
        </Group>
    );
};