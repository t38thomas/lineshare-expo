import useTheme from "@/hooks/useTheme";
import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export default function Background(props: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
    const theme = useTheme();

    return (
        <View style={[{ flex: 1, backgroundColor: theme.colors.background }, props.style]}>
            {props.children}
        </View>
    )
}