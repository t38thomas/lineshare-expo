import { ThemeContext } from '@/Context/Theme/ThemeContext';
import useTheme from '@/hooks/useTheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useMemo } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type IconNames = keyof typeof MaterialCommunityIcons.glyphMap

export type IconProps = {
    color?: string

    /**
     * default: 30
     */
    size?: number
    style?: StyleProp<TextStyle>
    reverse?:boolean
    name: IconNames
}

export default function Icon(props: IconProps) {

    const theme = useTheme();

    const size = useMemo(() => props.size ?? 30, [props.size]);
    
    const color = useMemo(() => {
        if(props.color) return props.color;
        else if(props.reverse) return theme.reverse.text;
        else return theme.colors.text;
    }, [props.color, props.reverse, theme.colors, theme.reverse])

    return (
        <MaterialCommunityIcons
            name={props.name}
            style={props.style}
            color={color}
            size={size}
        />
    )
}