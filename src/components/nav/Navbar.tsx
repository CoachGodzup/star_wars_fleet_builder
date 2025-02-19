'use client'

import { Stepper } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar: React.FC = () => {
    const stepPages = ['detail', 'composition', 'general'];
    const [active, setActive] = useState(0);
    const router = useRouter();

    const handleStepClick = (step: number) => {
        setActive(step);
        router.push(`/${stepPages[step]}`);
    }
    
    // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return <Stepper active={active} onStepClick={handleStepClick}>
        <Stepper.Step label="Fleet details" description="Name and description">
        </Stepper.Step>
        <Stepper.Step label="Fleet composition" description="Arm some ships">
        </Stepper.Step>
        <Stepper.Step label="Fleet general" description="Add some heroes">
        </Stepper.Step>
        <Stepper.Completed>
            Completed, click back button to get to previous step
        </Stepper.Completed>
    </Stepper>
}
