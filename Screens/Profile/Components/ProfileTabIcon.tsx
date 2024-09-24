import { IconNames } from "@/Components/Generali/Icon";
import TabIcon from "@/Components/Generali/TabIcon";
import useTabName from "@/hooks/useTabName";
import { TabIconProps } from "@/Screens/Home/Components/HomeTabIcon";
import { useMemo } from "react";

export default function ProfileTabIcon(props: TabIconProps) {

    const name = useTabName("account", "account-outline", props.focused);
   
    return (
        <TabIcon
            name={name}
            {...props}
        />
    )
}