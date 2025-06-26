import useTheme from '@/hooks/useTheme';
import useTimeout from '@/hooks/useTimeout';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetProps } from './BottomSheet';
import EnlargingContainer from './EnlargingContainer';
import Icon from './Icon';
import Text from './Text';

export type DropdownProps<T> = {
    /** Items to show inside the dropdown */
    items: T[];
    /** Callback when an item is selected. Pass `undefined` to clear */
    onSelect?: (item: T | undefined) => void;
    /** Current selected item */
    selected?: T;
    /** Text shown when no item is selected */
    placeholder?: string;
    /** Extract a label from your item. Defaults to `String(item)` */
    labelExtractor?: (item: T) => string;
    /** Provide custom key extractor */
    keyExtractor?: (item: T, index: number) => string;
    /** Render a custom item inside the bottom sheet */
    renderItem?: (item: T, index: number, close: () => void) => React.ReactElement;
    /** Style of the dropdown container */
    style?: StyleProp<ViewStyle>;
    /** Allow clearing the selected value */
    clearable?: boolean;
    /** Additional props for the underlying BottomSheet */
    bottomSheetProps?: Omit<BottomSheetProps, 'visible' | 'onRequestClose'>;
};

export default function Dropdown<T>(props: DropdownProps<T>) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const labelExtractor = useCallback((item: T) => {
        if (props.labelExtractor) return props.labelExtractor(item);
        return String(item);
    }, [props.labelExtractor]);

    const keyExtractor = useCallback((item: T, index: number) => {
        if (props.keyExtractor) return props.keyExtractor(item, index);
        return index.toString();
    }, [props.keyExtractor]);

    const onSelect = useCallback((item: T | undefined) => {
        setOpen(false);
        props.onSelect?.(item);
    }, [props.onSelect]);

    const selectedLabel = useMemo(() => {
        if (props.selected === undefined) return props.placeholder ?? '';
        return labelExtractor(props.selected);
    }, [props.selected, labelExtractor, props.placeholder]);

    const defaultRenderItem = useCallback((item: T, index: number) => {

        const isSelected = props.selected ? labelExtractor(item) === labelExtractor(props.selected) : false

        return (
            <Pressable
                style={styles.item}
                onPress={() => onSelect(item)}
            >
                <View style={{ borderRadius: 20, padding: 5, backgroundColor: isSelected ? theme.colors.lineshare : theme.colors.tertiary }} />
                <Text>{labelExtractor(item)}</Text>
            </Pressable>
        )
    }, [onSelect, labelExtractor, keyExtractor]);

    return (
        <>
            <Pressable
                style={[styles.container, { backgroundColor: theme.colors.secondary }, props.style]}
                onPress={() => setOpen(true)}
            >

                {props.clearable && props.selected !== undefined && (
                    <Pressable
                        onPress={() => onSelect(undefined)}
                    >

                        <Icon name="close-circle" size={18} />
                    </Pressable>
                )}

                <Text style={{ flex: 1 }}>{selectedLabel}</Text>

                <EnlargingContainer
                    enlarge={open}
                    startWidth={40}
                    endWidth={50}
                    style={[styles.iconContainer, { backgroundColor: theme.colors.lineshare }]}
                >
                    <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
                </EnlargingContainer>
            </Pressable>
            <BottomSheet
                visible={open}
                onRequestClose={() => setOpen(false)}
                auto
                {...props.bottomSheetProps}
            >
                <FlatList
                    data={props.items}
                    keyExtractor={keyExtractor}
                    renderItem={({ item, index }) => props.renderItem ? props.renderItem(item, index, () => setOpen(false)) : defaultRenderItem(item, index)}
                />
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
        height: 50,
        gap: 10,
    },
    iconContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        columnGap: 10,
        flexDirection: "row",
        alignItems: "center"
    },
});

