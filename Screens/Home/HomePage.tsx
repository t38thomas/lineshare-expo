import Background from "@/Components/Generali/Background";
import DatePicker from "@/Components/Generali/DatePicker";
import Dropdown from "@/Components/Generali/Dropdown";
import RangeDatePicker from "@/Components/Generali/RangeDatePicker";
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

            <DatePicker

                placeholder="Seleziona una data"
             />

             <RangeDatePicker 
                placeholder="Seleziona una data"
             />


        </Background>
    )
}