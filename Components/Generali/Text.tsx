import { ThemeContext } from "@/Context/Theme/ThemeContext";
import React from "react";
import { useContext, useMemo } from "react"
import { Text as RNText, TextProps as RNTextProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export type TextProps = RNTextProps & {
    reverse?: boolean
}

function Text(props: TextProps) {

    const theme = useContext(ThemeContext);

    const textColor: TextStyle = useMemo(() => {
        if (props.reverse === true) return { color: theme.reverse.text };
        else return { color: theme.colors.text }
    }, [props.reverse, theme.isDarkTheme]);

    const textStyle: StyleProp<ViewStyle> = useMemo(() => ([textColor, props.style]), [textColor, styles.text, props.style]);

    return (
        <RNText style={textStyle}>{props.children}</RNText>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 17
    }
})

export default React.memo(Text);