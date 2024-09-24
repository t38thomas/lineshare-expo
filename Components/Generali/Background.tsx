import useTheme from "@/hooks/useTheme";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function Background(props:PropsWithChildren){
    const theme = useTheme();
    
    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            {props.children}
        </View>
    )
}