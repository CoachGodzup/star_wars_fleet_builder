import { Container, Fieldset } from "@mantine/core";
import { mockAssignments } from "../../../test/mocks/mock.assignments";
import { TableFleet } from "../table/tableFleet";

export const GeneralForm: React.FC = () => {
    return (
        <Container>
            <Fieldset legend="Assign Generals">
                <TableFleet assignments={mockAssignments} />
            </Fieldset>
        </Container>
    );
}