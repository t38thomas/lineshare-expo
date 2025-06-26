import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleProp, StyleSheet, TextInputProps, View, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import useTheme from "@/hooks/useTheme";
import AnimatedTextInput from "../TextInputs/AnimatedTextInput";
import Text from "./Text";

export type AutoCompleteProps<T> = {
    items: T[];
    onSelect?: (item: T) => void;
    labelExtractor?: (item: T) => string;
    keyExtractor?: (item: T, index: number) => string;
    containerStyle?: StyleProp<ViewStyle>;
    suggestionsContainerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export default function AutoComplete<T>(props: AutoCompleteProps<T>) {
    const theme = useTheme();
    const [query, setQuery] = useState(props.value?.toString() ?? "");
    const [focused, setFocused] = useState(false);

    const labelExtractor = useCallback((item: T) => {
        if (props.labelExtractor) return props.labelExtractor(item);
        return String(item);
    }, [props.labelExtractor]);

    const keyExtractor = useCallback((item: T, index: number) => {
        if (props.keyExtractor) return props.keyExtractor(item, index);
        return index.toString();
    }, [props.keyExtractor]);

    const filtered = useMemo(() => {
        if (query.length === 0) return props.items;
        return props.items.filter((item) =>
            labelExtractor(item).toLowerCase().includes(query.toLowerCase())
        );
    }, [props.items, query, labelExtractor]);

    const onChange = useCallback((text: string) => {
        setQuery(text);
        props.onChangeText?.(text);
    }, [props.onChangeText]);

    const select = useCallback((item: T) => {
        const label = labelExtractor(item);
        setQuery(label);
        props.onSelect?.(item);
        setFocused(false);
    }, [labelExtractor, props.onSelect]);

    return (
        <View style={styles.wrapper}>
            <AnimatedTextInput
                {...props}
                value={query}
                onChangeText={onChange}
                onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
                onBlur={(e) => { props.onBlur?.(e); }}
                containerStyle={props.containerStyle}
            />
            {focused && filtered.length > 0 && (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={[styles.listContainer, { backgroundColor: theme.colors.secondary }, props.suggestionsContainerStyle]}
                >
                    <FlatList
                        data={filtered}
                        keyExtractor={keyExtractor}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <Pressable style={styles.item} onPress={() => select(item)}>
                                <Text>{labelExtractor(item)}</Text>
                            </Pressable>
                        )}
                    />
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
    },
    listContainer: {
        position: "absolute",
        top: 60,
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        zIndex: 10,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
