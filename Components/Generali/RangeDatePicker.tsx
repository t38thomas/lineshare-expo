import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat } from "@/utils/DateFormat";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Calendar from "./Calendar";

export type DateRange = {
    startDate?: Date;
    endDate?: Date;
};

export type RangeDatePickerProps = {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    placeholder?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    style?: StyleProp<ViewStyle>;
};

export default function RangeDatePicker(props: RangeDatePickerProps) {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [start, setStart] = useState<Date | undefined>(props.value?.startDate);
    const [end, setEnd] = useState<Date | undefined>(props.value?.endDate);

    const display = useMemo(() => {
        if (props.value?.startDate && props.value?.endDate) {
            return (
                DateFormat.numericFormat(props.value.startDate) +
                " - " +
                DateFormat.numericFormat(props.value.endDate)
            );
        }
        return props.placeholder ?? "";
    }, [props.value, props.placeholder]);

    const open = useCallback(() => {
        setStart(props.value?.startDate);
        setEnd(props.value?.endDate);
        setVisible(true);
    }, [props.value]);

    const confirm = useCallback(() => {
        setVisible(false);
        props.onChange?.({ startDate: start, endDate: end });
    }, [start, end, props.onChange]);

    const onSelect = useCallback((d: Date) => {
        if (start && !end) {
            if (d.getTime() < start.getTime()) {
                setEnd(start);
                setStart(d);
            } else {
                setEnd(d);
            }
        } else {
            setStart(d);
            setEnd(undefined);
        }
    }, [start, end]);

    const isSelected = useCallback((day: Date) => {
        if (start && end) {
            const min = start.getTime() < end.getTime() ? start : end;
            const max = start.getTime() < end.getTime() ? end : start;
            return day.getTime() >= min.getTime() && day.getTime() <= max.getTime();
        }
        if (start && !end) return day.toDateString() === start.toDateString();
        return false;
    }, [start, end]);

    return (
        <>
            <Pressable
                style={[styles.container, { backgroundColor: theme.colors.secondary }, props.style]}
                onPress={open}
            >
                <Text>{display}</Text>
            </Pressable>
            <BottomSheet visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.pickerContainer}>
                    <Calendar
                        date={end ?? start ?? new Date()}
                        onSelect={onSelect}
                        minimumDate={props.minimumDate}
                        maximumDate={props.maximumDate}
                        isSelected={isSelected}
                    />
                    <View style={styles.buttonContainer}>
                        <Button onPress={confirm} width={150}>
                            <Text style={useButtonText()}>Conferma</Text>
                        </Button>
                    </View>
                </View>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 20,
        height: 50,
    },
    pickerContainer: {
        padding: 20,
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});
