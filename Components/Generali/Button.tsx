import useTheme from "@/hooks/useTheme";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { GestureResponderEvent, Pressable, PressableAndroidRippleConfig, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import EnlargingContainer from "./EnlargingContainer";
import useTimeout from "@/hooks/useTimeout";

type ButtonProps = PropsWithChildren<{
    animated?: boolean
    width?: number
    contentContainerStyle?: StyleProp<ViewStyle>
    disabledAll?: boolean
}> & PressableProps;

export default function Button(props: ButtonProps) {

    const theme = useTheme();

    const width = useMemo(() => {
        if (props.width) return props.width;
        else return 130;
    }, [props.width])

    const [enlarge, setEnlarge] = useState<boolean>(false);

    useTimeout(() => {
        if (enlarge) setEnlarge(false);
    }, 300, [enlarge])

    const onPressIn = useCallback((event: GestureResponderEvent) => {
        props.onPressIn?.(event);
        if (props.animated !== false) setEnlarge(true);
        else setEnlarge(false);
    }, [props.onPressIn, props.animated])

    const contentContainerStyle: StyleProp<ViewStyle> = useMemo(() => {
        return [buttonStyles.container, { backgroundColor: props.disabledAll ? theme.colors.tertiary : theme.colors.lineshare }, props.contentContainerStyle]
    }, [props.contentContainerStyle, buttonStyles.container, theme, props.disabledAll])

    const animated = useMemo(() => {
        if (props.animated === false || props.disabledAll === true) return false;
        else return true;
    }, [props.animated, props.disabledAll])

    return (
        <Pressable
            {...props}
            onPressIn={onPressIn}
            style={{ borderRadius: 50, }}
        >
            <EnlargingContainer startWidth={width} endWidth={width + 20} enlarge={animated ? enlarge : false} style={contentContainerStyle}>
                {props.children}
            </EnlargingContainer>
        </Pressable>
    )
}

export function useButtonText(disabledAll?: boolean): StyleProp<TextStyle> {
    return [buttonStyles.text, { color: disabledAll ? "gray" : "white" }]
}

export const buttonStyles = StyleSheet.create({
    container: {
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 17,
        fontFamily: "Sora-Bold"
    }
})