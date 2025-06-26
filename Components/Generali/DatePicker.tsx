import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat, mesi } from "@/utils/DateFormat";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export type DatePickerProps = {
    value?: Date;
    onChange?: (date: Date) => void;
    placeholder?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    style?: StyleProp<ViewStyle>;
};

export default function DatePicker(props: DatePickerProps) {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [temp, setTemp] = useState<Date>(props.value ?? new Date());

    const display = useMemo(() => {
        if (props.value) return DateFormat.numericFormat(props.value);
        return props.placeholder ?? "";
    }, [props.value, props.placeholder]);

    const open = useCallback(() => {
        setTemp(props.value ?? new Date());
        setVisible(true);
    }, [props.value]);

    const confirm = useCallback(() => {
        setVisible(false);
        props.onChange?.(temp);
    }, [temp, props.onChange]);

    const daysInMonth = useCallback((year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }, []);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const start = props.minimumDate?.getFullYear() ?? currentYear - 100;
        const end = props.maximumDate?.getFullYear() ?? currentYear + 10;
        const arr: number[] = [];
        for (let y = start; y <= end; y++) arr.push(y);
        return arr;
    }, [props.minimumDate, props.maximumDate]);

    const days = useMemo(() => {
        return Array.from({ length: daysInMonth(temp.getFullYear(), temp.getMonth()) }, (_, i) => i + 1);
    }, [temp, daysInMonth]);

    const selectDay = useCallback((d: number) => {
        const date = new Date(temp);
        date.setDate(d);
        setTemp(date);
    }, [temp]);

    const selectMonth = useCallback((m: number) => {
        const date = new Date(temp);
        const day = date.getDate();
        const daysCount = daysInMonth(date.getFullYear(), m);
        date.setMonth(m, Math.min(day, daysCount));
        setTemp(date);
    }, [temp, daysInMonth]);

    const selectYear = useCallback((y: number) => {
        const date = new Date(temp);
        const day = date.getDate();
        const daysCount = daysInMonth(y, date.getMonth());
        date.setFullYear(y, date.getMonth(), Math.min(day, daysCount));
        setTemp(date);
    }, [temp, daysInMonth]);

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
                    <View style={styles.selectRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {days.map((d) => (
                                <Pressable key={"d" + d} onPress={() => selectDay(d)} style={[styles.item, d === temp.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={d === temp.getDate() ? { color: "white" } : undefined}>{d}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {mesi.map((m, idx) => (
                                <Pressable key={"m" + idx} onPress={() => selectMonth(idx)} style={[styles.item, idx === temp.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={idx === temp.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectScroll}>
                            {years.map((y) => (
                                <Pressable key={"y" + y} onPress={() => selectYear(y)} style={[styles.item, y === temp.getFullYear() && { backgroundColor: theme.colors.lineshare }]}> 
                                    <Text style={y === temp.getFullYear() ? { color: "white" } : undefined}>{y}</Text>
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
