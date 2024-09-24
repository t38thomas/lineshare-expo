import { StyleSheet } from "react-native"

export interface Theme {
    background: string
    lineshare: string
    darkLineshare: string
    secondary: string
    tertiary:string
    link: string
    error: string
    text: string
    border: string
    selection:string
    petal:string
}

export const LightTheme: Theme = {
    background: "#ffffff",
    lineshare: "#ff7f00",
    darkLineshare: "#994c00",
    secondary: "#EEEEEE",
    tertiary:"#d6d6d6",
    link: "#0000AA",
    error: "#FF0000",
    text: "#000000",
    border: "rgba(0,0,0,0.25)",
    selection: "#cacaca",
    petal: "#FDF1F5"
}

export const DarkTheme: Theme = {
    background: "#121212",
    lineshare: "#ee8e46",
    darkLineshare: "#994c00",
    secondary: "#272727",
    tertiary: "#373737",
    link: "#ABCDEF",
    error: "#FF0000",
    text: "#FFFFFF",
    border: "rgba(255,255,255,0.2)",
    selection: "#636363",
    petal: "#FDF1F5"
}

export const DefaultStyle = StyleSheet.create({
    title: {
        fontSize: 27,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "500"
    }
})