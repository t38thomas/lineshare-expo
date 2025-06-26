import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetProps } from './BottomSheet';
import Text from './Text';
import Icon from './Icon';
import useTheme from '@/hooks/useTheme';

export type DropdownProps<T> = {
    /** Items to show inside the dropdown */
    items: T[];
    /** Callback when an item is selected */
    onSelect?: (item: T) => void;
    /** Current selected item */
    selected?: T;
    /** Text shown when no item is selected */
    placeholder?: string;
    /** Extract a label from your item. Defaults to `String(item)` */
    labelExtractor?: (item: T) => string;
    /** Provide custom key extractor */
    keyExtractor?: (item: T, index: number) => string;
    /** Render a custom item inside the bottom sheet */
    renderItem?: (item: T, close: () => void) => React.ReactElement;
    /** Style of the dropdown container */
    style?: StyleProp<ViewStyle>;
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

    const onSelect = useCallback((item: T) => {
        setOpen(false);
        props.onSelect?.(item);
    }, [props.onSelect]);

    const selectedLabel = useMemo(() => {
        if (props.selected === undefined) return props.placeholder ?? '';
        return labelExtractor(props.selected);
    }, [props.selected, labelExtractor, props.placeholder]);

    const defaultRenderItem = useCallback((item: T) => (
        <Pressable
            style={styles.item}
            onPress={() => onSelect(item)}
        >
            <Text>{labelExtractor(item)}</Text>
        </Pressable>
    ), [onSelect, labelExtractor]);

    return (
        <>
            <Pressable
                style={[styles.container, { backgroundColor: theme.colors.secondary }, props.style]}
                onPress={() => setOpen(true)}
            >
                <Text style={{ flex: 1 }}>{selectedLabel}</Text>
                <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
            </Pressable>
            <BottomSheet
                visible={open}
                onRequestClose={() => setOpen(false)}
                snapPoints={["50%"]}
                {...props.bottomSheetProps}
            >
                <FlatList
                    data={props.items}
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => props.renderItem ? props.renderItem(item, () => setOpen(false)) : defaultRenderItem(item)}
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
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
});

