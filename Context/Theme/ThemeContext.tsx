import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { DarkTheme, LightTheme, Theme } from "./Theme";
import { useColorScheme, View } from "react-native";

interface ThemeContextProps{
    isDarkTheme:boolean,
    toggle:() => void,
    colors:Theme,
    reverse:Theme
}

const themeContext:ThemeContextProps = {
    isDarkTheme: false,
    toggle: () => {},
    colors: LightTheme,
    reverse: DarkTheme,
}

export const ThemeContext = createContext(themeContext);

export default function ThemeContextProvider(props:PropsWithChildren){

    const colorSheme = useColorScheme();
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(colorSheme === "dark" ? true : false);

    useEffect(() => {
        setIsDarkTheme(colorSheme === "dark" ? true : false);
    }, [colorSheme])

    const toggle = useCallback(() => {
        setIsDarkTheme(prev => !prev);
    }, [])

    return(
        <ThemeContext.Provider
            value={{
                isDarkTheme: isDarkTheme,
                colors: isDarkTheme ? DarkTheme : LightTheme,
                reverse: isDarkTheme ? LightTheme : DarkTheme,
                toggle: toggle 
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}
