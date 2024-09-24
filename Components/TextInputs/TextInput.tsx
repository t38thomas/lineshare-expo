import useTheme from "@/hooks/useTheme";
import React from "react";
import { useMemo } from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleProp, TextStyle } from "react-native";

export type TextInputProps = {

} & RNTextInputProps;

function TextInput(props: TextInputProps) {

    const theme = useTheme();

    const style: StyleProp<TextStyle> = useMemo(() => ([
        props.style,
        { color: theme.colors.text, fontFamily: "Sora-Medium" }
    ]), [props.style, theme])

    return (
        <RNTextInput
            {...props}
            style={style}
            placeholderTextColor={"gray"}
        />
    )
}

export default React.memo(TextInput);