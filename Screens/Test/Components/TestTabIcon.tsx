import TabIcon from "@/Components/Generali/TabIcon";
import useTabName from "@/hooks/useTabName";
import { TabIconProps } from "@/Screens/Home/Components/HomeTabIcon";

export default function TestTabIcon(props: TabIconProps) {

    const name = useTabName("test-tube", "test-tube-empty", props.focused);
    
    return (
        <TabIcon
            name={name}
            {...props}
        />
    )
}