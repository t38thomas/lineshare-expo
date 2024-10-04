import { Pressable } from "react-native"
import Icon, { IconProps } from "./Icon"

type IconPressableProps = {
    onPress?: () => void
} & IconProps

export default function IconPressable(props: IconPressableProps) {
    return (
        <Pressable
            onPress={props.onPress}
        >
            <Icon
                name={props.name}
                color={props.color}
                reverse={props.reverse}
                size={props.size}
                style={props.style}
            />
        </Pressable>
    )
}