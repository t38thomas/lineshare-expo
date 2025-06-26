import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat, mesi } from "@/utils/DateFormat";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

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
    const [start, setStart] = useState<Date>(props.value?.startDate ?? new Date());
    const [end, setEnd] = useState<Date>(props.value?.endDate ?? new Date());

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
        setStart(props.value?.startDate ?? new Date());
        setEnd(props.value?.endDate ?? new Date());
        setVisible(true);
    }, [props.value]);

    const daysInMonth = useCallback((year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }, []);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startY = props.minimumDate?.getFullYear() ?? currentYear - 100;
        const endY = props.maximumDate?.getFullYear() ?? currentYear + 10;
        const arr: number[] = [];
        for (let y = startY; y <= endY; y++) arr.push(y);
        return arr;
    }, [props.minimumDate, props.maximumDate]);

    const daysStart = useMemo(() => {
        return Array.from({ length: daysInMonth(start.getFullYear(), start.getMonth()) }, (_, i) => i + 1);
    }, [start, daysInMonth]);

    const daysEnd = useMemo(() => {
        return Array.from({ length: daysInMonth(end.getFullYear(), end.getMonth()) }, (_, i) => i + 1);
    }, [end, daysInMonth]);

    const selectDayStart = useCallback((d: number) => {
        const date = new Date(start);
        date.setDate(d);
        setStart(date);
    }, [start]);

    const selectMonthStart = useCallback((m: number) => {
        const date = new Date(start);
        const day = date.getDate();
        const daysCount = daysInMonth(date.getFullYear(), m);
        date.setMonth(m, Math.min(day, daysCount));
        setStart(date);
    }, [start, daysInMonth]);

    const selectYearStart = useCallback((y: number) => {
        const date = new Date(start);
        const day = date.getDate();
        const daysCount = daysInMonth(y, date.getMonth());
        date.setFullYear(y, date.getMonth(), Math.min(day, daysCount));
        setStart(date);
    }, [start, daysInMonth]);

    const selectDayEnd = useCallback((d: number) => {
        const date = new Date(end);
        date.setDate(d);
        setEnd(date);
    }, [end]);

    const selectMonthEnd = useCallback((m: number) => {
        const date = new Date(end);
        const day = date.getDate();
        const daysCount = daysInMonth(date.getFullYear(), m);
        date.setMonth(m, Math.min(day, daysCount));
        setEnd(date);
    }, [end, daysInMonth]);

    const selectYearEnd = useCallback((y: number) => {
        const date = new Date(end);
        const day = date.getDate();
        const daysCount = daysInMonth(y, date.getMonth());
        date.setFullYear(y, date.getMonth(), Math.min(day, daysCount));
        setEnd(date);
    }, [end, daysInMonth]);

    const confirm = useCallback(() => {
        setVisible(false);
        props.onChange?.({ startDate: start, endDate: end });
    }, [start, end, props.onChange]);

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
                    <Text style={styles.label}>Dal</Text>
                    <View style={styles.selectRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {daysStart.map((d) => (
                                <Pressable key={"sd" + d} onPress={() => selectDayStart(d)} style={[styles.item, d === start.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={d === start.getDate() ? { color: "white" } : undefined}>{d}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {mesi.map((m, idx) => (
                                <Pressable key={"sm" + idx} onPress={() => selectMonthStart(idx)} style={[styles.item, idx === start.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={idx === start.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {years.map((y) => (
                                <Pressable key={"sy" + y} onPress={() => selectYearStart(y)} style={[styles.item, y === start.getFullYear() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={y === start.getFullYear() ? { color: "white" } : undefined}>{y}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={[styles.label, { marginTop: 20 }]}>Al</Text>
                    <View style={styles.selectRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {daysEnd.map((d) => (
                                <Pressable key={"ed" + d} onPress={() => selectDayEnd(d)} style={[styles.item, d === end.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={d === end.getDate() ? { color: "white" } : undefined}>{d}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {mesi.map((m, idx) => (
                                <Pressable key={"em" + idx} onPress={() => selectMonthEnd(idx)} style={[styles.item, idx === end.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={idx === end.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {years.map((y) => (
                                <Pressable key={"ey" + y} onPress={() => selectYearEnd(y)} style={[styles.item, y === end.getFullYear() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={y === end.getFullYear() ? { color: "white" } : undefined}>{y}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
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
    label: {
        fontSize: 16,
        fontFamily: "Sora-Bold",
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    selectRow: {
        flexDirection: "row",
        columnGap: 10,
    },
    selectScroll: {
        flexGrow: 0,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
});
