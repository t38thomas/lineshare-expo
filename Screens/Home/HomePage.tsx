import Background from "@/Components/Generali/Background";
import Dropdown from "@/Components/Generali/Dropdown";
import { useState } from "react";

type Person = {
    name: string,
    age: number
}

export default function HomePage() {

    const items: Person[] = [
        {
            name: "Thomas",
            age: 20
        },
        {
            name: "Samuel",
            age: 21
        },
    ]

    const [value, setValue] = useState<Person>();

    return (
        <Background style={{ justifyContent: "center", alignItems: "center", padding: 15 }}>

            <Dropdown
                items={items}
                placeholder="Seleziona una persona..."
                clearable
                selected={value}
                onSelect={setValue}
                labelExtractor={x => x.name}
                keyExtractor={x => x.name}
            />

        </Background>
    )
}