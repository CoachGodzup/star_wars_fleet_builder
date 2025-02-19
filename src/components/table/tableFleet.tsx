'use client'

import { Assignment } from "@/model/assignment";
import { Avatar, Badge, Group, Table, Text } from "@mantine/core";

type TableFleetProps = {
    assignments: Assignment[];
}

export const TableFleet: React.FC<TableFleetProps> = ({ assignments }) => {
    return (
        <Table>
            {assignments.map((assignment, index) => (
                <Table.Tr key={index + assignment.starship.url}>
                    <Table.Td>
                        <Group gap="sm">
                            <Avatar size={40} color={'initials'} radius={40} name={assignment.starship.name} />
                            <div>
                                <Text fz="sm" fw={500}>
                                    {assignment.starship.name}
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Model: {assignment.starship.model}
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Crew: {assignment.starship.crew}
                                </Text>
                            </div>
                        </Group>
                    </Table.Td>
                    <Table.Td>
                        {assignment.general ? (
                            <Group gap="sm">
                                <Avatar size={40} radius={40} name={assignment.general.name} color={'initials'} />
                                <div>
                                    <Text fz="sm" fw={500}>
                                        {assignment.general.name}
                                    </Text>
                                </div>
                            </Group>
                        ) : (
                            <></>
                        )}
                    </Table.Td>
                    <Table.Td>
                        TODO ASSIGN GENERAL
                        {/*<Select
                            data={rolesData}
                            defaultValue={item.role}
                            variant="unstyled"
                            allowDeselect={false}
                        />*/}
                    </Table.Td>
                    <Table.Td>
                        {assignment.general ? (
                            <Badge fullWidth variant="light">
                                General
                            </Badge>
                        ) : (
                            <Badge color="gray" fullWidth variant="light">
                                Disabled
                            </Badge>
                        )}
                    </Table.Td>
                </Table.Tr>
            ))}
        </Table>
    );
};