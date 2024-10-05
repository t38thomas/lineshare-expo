import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import TextInput, { TextInputProps } from "./TextInput";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputFocusEventData, ViewStyle } from "react-native";
import useTheme from "@/hooks/useTheme";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { ValidationReturn, ValidationFunction } from "@/utils/Validation";
import EnlargingContainer from "../Generali/EnlargingContainer";

type AnimatedTextInputProps = {
    animated?: boolean
    validation?: ValidationFunction
    containerStyle?:StyleProp<ViewStyle>

    /**
     * @default 300
     */
    width?: number
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
    
    const width = useMemo(() => {
        if(props.width) return props.width;
        else return 300;
    }, [props.width])

    return (
        <EnlargingContainer enlarge={isFocused} startWidth={width} endWidth={width + 50} style={[enlargingContainerStyle, props.containerStyle]}>
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

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        fontSize: 17,
        fontFamily: "Sora-Medium"
    }
})