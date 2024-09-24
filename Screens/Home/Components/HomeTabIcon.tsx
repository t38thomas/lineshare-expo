import TabIcon from "@/Components/Generali/TabIcon";
import useTabName from "@/hooks/useTabName";

export type TabIconProps = {
    focused: boolean;
    color: string;
    size: number;
}

export default function HomeTabIcon(props: TabIconProps){

    const name = useTabName("home", "home-outline", props.focused);

    return (
        <TabIcon
            name={name}
            {...props}
        />
    )
}