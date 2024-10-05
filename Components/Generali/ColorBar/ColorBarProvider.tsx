
import { StatusBar } from "expo-status-bar";
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, useColorScheme, View } from "react-native";
import { SafeAreaView as SafeAndroid } from "react-native-safe-area-context";

export const ColorBarContext = createContext<{
    addColorStatusBar: (color: string) => void,
    addColorNavigationBar: (color: string) => void,
    removeColorStatusBar: () => void,
    removeColorNavigationBar: () => void
    colorStatusBar: string | undefined,
    colorNavigationBar: string | undefined
}>({
    addColorNavigationBar: () => { },
    addColorStatusBar: () => { },
    removeColorNavigationBar: () => { },
    removeColorStatusBar: () => { },
    colorStatusBar: undefined,
    colorNavigationBar: undefined
})

export default function ColorBarProvider(props: PropsWithChildren) {

    const [colorStatusBar, setColorStatusBar] = useState<string>();
    const [colorNavigationBar, setColorNavigationBar] = useState<string>();
    const colorStatusBarArray = useRef<string[]>([]).current;
    const colorNavigationBarArray = useRef<string[]>([]).current;

    const addColorNavigationBar = (color: string) => {
        colorNavigationBarArray.push(color);
        setColorNavigationBar(color);
    }

    const removeColorNavigationBar = () => {
        colorNavigationBarArray.pop();
        setColorNavigationBar(colorNavigationBarArray[colorNavigationBarArray.length - 1]);
    }

    const addColorStatusBar = (color: string) => {
        colorStatusBarArray.push(color);
        setColorStatusBar(color);
    }

    const removeColorStatusBar = () => {
        colorStatusBarArray.pop();
        setColorStatusBar(colorStatusBarArray[colorStatusBarArray.length - 1]);
    }


    return (
        <ColorBarContext.Provider value={{
            addColorNavigationBar,
            addColorStatusBar,
            removeColorNavigationBar,
            removeColorStatusBar,
            colorNavigationBar,
            colorStatusBar

        }}>
            <>
                <StatusBar style={"auto"} animated translucent backgroundColor={colorStatusBar as string} />
                <SafeAreaView style={{ backgroundColor: colorStatusBar }} />
                {
                    Platform.OS === "ios" ?
                        <SafeAreaView style={{ flex: 1, backgroundColor: colorNavigationBar }}>
                            {props.children}
                        </SafeAreaView>
                        :
                        <SafeAndroid style={{ flex: 1, backgroundColor: colorStatusBar }}>
                            {props.children}
                        </SafeAndroid>

                }
            </>
        </ColorBarContext.Provider>
    )


}
