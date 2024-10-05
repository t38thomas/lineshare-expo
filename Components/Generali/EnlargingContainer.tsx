import useTheme from "@/hooks/useTheme"
import { PropsWithChildren, useEffect } from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

type EnlargingContainerProps = PropsWithChildren<{
    enlarge?: boolean
    startWidth: number
    endWidth?: number
    style?: StyleProp<ViewStyle>
}>

export default function EnlargingContainer(props: EnlargingContainerProps) {

    const theme = useTheme();

    const width = useSharedValue(props.startWidth);

    useEffect(() => {
        if (props.endWidth) {
            if (props.enlarge) width.value = withSpring(props.endWidth);
            else width.value = withSpring(props.startWidth);
        }
    }, [props.enlarge, props.endWidth])

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value
    }), [width])

    return (
        <Animated.View style={[styles.enlargingContainer, animatedStyle, { backgroundColor: theme.colors.secondary,}, props.style]} >
            {props.children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    enlargingContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
})