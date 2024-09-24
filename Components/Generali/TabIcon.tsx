import Icon, { IconProps } from "./Icon"

type TabIconProps = Pick<IconProps, "name" | "color"> & {
    focused?: boolean
}

export default function TabIcon(props: TabIconProps) {
    return (
        <Icon
            name={props.name}
            color={props.color}
        />
    )
}