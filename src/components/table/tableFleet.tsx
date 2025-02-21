'use client';

import { Assignment } from '@/model/assignment';
import { Person } from '@/model/person';
import {
  assignGeneral,
  removeGeneral,
  removeShip,
} from '@/store/assignmentReducer';
import { getColorByCrew, getIconByCrew } from '@/utils/starship';
import { Avatar, CloseButton, Group, Table, Text } from '@mantine/core';
import { IconUserMinus, IconUserStar } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';

type TableFleetProps = {
  assignments: Assignment[];
  canRemove?: boolean;
  canAssignGeneral?: boolean;
  newGeneral?: Person;
};

export const TableFleet: React.FC<TableFleetProps> = ({
  assignments,
  canRemove = false,
  canAssignGeneral = false,
  newGeneral,
}) => {
  const dispatch = useDispatch();

  const handleRemove = (index: number) => {
    dispatch(removeShip(index));
  };

  const handleAssignGeneral = (index: number) => {
    if (newGeneral) {
      dispatch(assignGeneral({ index, general: newGeneral }));
    }
  };

  const handleRemoveGeneral = (index: number) => {
    dispatch(removeGeneral(index));
  };

  return (
    <Table>
      <Table.Tbody>
        {assignments.map((assignment, index) => (
          <Table.Tr key={index + assignment.starship.url}>
            <Table.Td>
              <Group gap='sm'>
                <Avatar
                  size={40}
                  color={getColorByCrew(Number(assignment.starship.crew))}
                  radius={40}
                  name={assignment.starship.name}
                >
                  {getIconByCrew(Number(assignment.starship.crew))}
                </Avatar>
                <div>
                  <Text fz='sm' fw={500}>
                    {assignment.starship.name}
                  </Text>
                  <Text fz='xs' c='dimmed'>
                    Model: {assignment.starship.model}
                  </Text>
                  <Text fz='xs' c='dimmed'>
                    Crew: {assignment.starship.crew}
                  </Text>
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              {assignment.general ? (
                <Group gap='sm'>
                  <Avatar
                    size={40}
                    radius={40}
                    name={assignment.general.name}
                    color={'initials'}
                  />
                  <div>
                    <Text fz='sm' fw={500}>
                      {assignment.general.name}
                    </Text>
                  </div>
                </Group>
              ) : (
                <></>
              )}
            </Table.Td>
            <Table.Td>
              {/*
                                TODO ASSIGN GENERAL
                                <Select
                                    data={rolesData}
                                    defaultValue={item.role}
                                    variant="unstyled"
                                    allowDeselect={false}
                                />*/}
            </Table.Td>
            <Table.Td>
              {canAssignGeneral && !assignment.general ? (
                <CloseButton
                  icon={<IconUserStar></IconUserStar>}
                  onClick={() => handleAssignGeneral(index)}
                ></CloseButton>
              ) : (
                <></>
              )}
              {canAssignGeneral && assignment.general ? (
                <CloseButton
                  icon={<IconUserMinus></IconUserMinus>}
                  onClick={() => handleRemoveGeneral(index)}
                ></CloseButton>
              ) : (
                <></>
              )}
              {canRemove ? (
                <CloseButton onClick={() => handleRemove(index)}></CloseButton>
              ) : (
                <></>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
