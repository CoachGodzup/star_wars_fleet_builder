import { Center, Group, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

type PrevButtonProps = {
    url: string;
    label?: string;
}

type NextButtonProps = {
    url: string;
    label?: string;
    type?: 'submit' | 'button';
    isValid: boolean;
    invalidMessage: string;
}

export type NavButtonsProps = {
    prev?: PrevButtonProps;
    next: NextButtonProps;
}

export const NavButtons: React.FC<NavButtonsProps> = ({prev, next}) => {
    const router = useRouter();

    const handlePrev = () => {
        if (prev) {
            router.push(prev.url);
        }
    }

    const handleNext = () => {
        if (next.isValid) {
            router.push(next.url)
        } else {
            notifications.show({
                title: 'Aw, ships!', 
                message: next.invalidMessage,
                color: 'red',
                withCloseButton: true,
                autoClose: 3000,
            });
        }
    }

    return <Center>
        <Group pt={10}>
            {prev ? <Button onClick={handlePrev}>{prev.label || 'Prev'}</Button> : <></>}
            {next ? <Button onClick={handleNext} type={next.type || 'button'}>{next.label || 'Next'}</Button> : <></>}
        </Group>
    </Center>
}