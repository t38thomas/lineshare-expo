import React, { useContext, useEffect } from "react";
import { ColorBarContext } from "./ColorBarProvider";
 

interface ColorBarProps {
    colorStatusBar?: string,
    colorNavigationBar?: string
}


export default function ColorBar(props: ColorBarProps) {

    const ColorBar = useContext(ColorBarContext);

    useEffect(() => {

        if (props.colorNavigationBar)
            ColorBar.addColorNavigationBar(props.colorNavigationBar)
        if (props.colorStatusBar)
            ColorBar.addColorStatusBar(props.colorStatusBar)


        return () => {
            if (props.colorNavigationBar) {
                ColorBar.removeColorNavigationBar();
            }
            if (props.colorStatusBar) {
                ColorBar.removeColorStatusBar();
            }
        }

    }, [props.colorNavigationBar, props.colorStatusBar])



    return (
        <></>
    )


}