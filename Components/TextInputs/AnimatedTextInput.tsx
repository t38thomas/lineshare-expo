import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import TextInput, { TextInputProps } from "./TextInput";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputFocusEventData, ViewStyle } from "react-native";
import useTheme from "@/hooks/useTheme";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { ValidationReturn, ValidationFunction } from "@/utils/Validation";

type AnimatedTextInputProps = {
    animated?: boolean
    validation?: ValidationFunction
    width: number
} & TextInputProps;

export default function AnimatedTextInput(props: AnimatedTextInputProps) {

    const theme = useTheme();

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [validation, setValidation] = useState<ValidationReturn>();

    const onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        props.onFocus?.(e)
    }, [props.onFocus])

    const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false)
        setValidation(prev => {
            if (prev && prev.valid) return undefined;
            return prev;
        })
        props.onBlur?.(e)
    }, [props.onBlur])

    const onChangeText = useCallback((text: string) => {
        if (props.validation) {
            setValidation(props.validation(text));
        }
        props.onChangeText?.(text);
    }, [props.validation, props.onChangeText]);

    const enlargingContainerStyle: StyleProp<ViewStyle> | undefined = useMemo(() => {
        if (validation) {
            if (validation.valid === false) return {
                borderWidth: 1,
                borderColor: theme.colors.error
            }
            else return {
                borderWidth: 1,
                borderColor: "lightgreen"
            }
        }
    }, [validation, theme])

    return (
        <EnlargingContainer enlarge={isFocused} startWidth={props.width} endWidth={props.width + 50} style={enlargingContainerStyle}>
            <TextInput
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
                style={styles.textInput}
                onChangeText={onChangeText}
            />
        </EnlargingContainer>
    )
}

type EnlargingContainerProps = PropsWithChildren<{
    enlarge?: boolean
    startWidth: number
    endWidth?: number
    style?: StyleProp<ViewStyle>
}>

function EnlargingContainer(props: EnlargingContainerProps) {

    const theme = useTheme();

    const width = useSharedValue(props.startWidth);

    useEffect(() => {
        if (props.endWidth) {
            if (props.enlarge) width.value = withSpring(props.endWidth);
            else width.value = withSpring(props.startWidth);
        }
    }, [props.enlarge, props.endWidth])


    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: theme.colors.secondary,
        width: width.value
    }), [width, theme])

    return (
        <Animated.View style={[props.style, styles.enlargingContainer, animatedStyle]}>
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
    textInput: {
        height: 50,
        fontSize: 17,
        fontFamily: "Sora-Medium"
    }
})