import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat, mesi } from "@/utils/DateFormat";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";

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
    const [yearSheet, setYearSheet] = useState(false);
    const [yearQuery, setYearQuery] = useState("");
    const [yearPage, setYearPage] = useState(1);

    useEffect(() => {
        setYearPage(1);
    }, [yearQuery]);

    const display = useMemo(() => {
        if (props.value) return DateFormat.numericFormat(props.value);
        return props.placeholder ?? "";
    }, [props.value, props.placeholder]);

    const open = useCallback(() => {
        setTemp(props.value ?? new Date());
        setYearQuery("");
        setYearPage(1);
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

    const filteredYears = useMemo(() => {
        return years.filter((y) => y.toString().includes(yearQuery));
    }, [years, yearQuery]);

    const yearPageSize = 20;
    const displayedYears = useMemo(() => {
        return filteredYears.slice(0, yearPage * yearPageSize);
    }, [filteredYears, yearPage]);

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
                    <Pressable onPress={() => setYearSheet(true)}>
                        <Text style={styles.yearLabel}>{temp.getFullYear()}</Text>
                    </Pressable>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.selectScroll, { marginVertical: 10 }]}> 
                        {mesi.map((m, idx) => (
                            <Pressable key={"m" + idx} onPress={() => selectMonth(idx)} style={[styles.item, idx === temp.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={idx === temp.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.daysGrid}>
                        {days.map((d) => (
                            <Pressable key={"d" + d} onPress={() => selectDay(d)} style={[styles.dayItem, d === temp.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={d === temp.getDate() ? { color: "white" } : undefined}>{d}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={confirm} width={150}>
                            <Text style={useButtonText()}>Conferma</Text>
                        </Button>
                    </View>
                </View>
            </BottomSheet>

            <BottomSheet visible={yearSheet} onRequestClose={() => setYearSheet(false)}>
                <View style={styles.yearContainer}>
                    <TextInput
                        placeholder="Cerca anno"
                        value={yearQuery}
                        onChangeText={setYearQuery}
                        style={styles.searchInput}
                        keyboardType="numeric"
                    />
                    <FlatList
                        data={displayedYears}
                        keyExtractor={(item) => item.toString()}
                        onEndReached={() => {
                            if (displayedYears.length < filteredYears.length) setYearPage((p) => p + 1);
                        }}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[styles.yearItem, item === temp.getFullYear() && { backgroundColor: theme.colors.lineshare }]}
                                onPress={() => {
                                    selectYear(item);
                                    setYearSheet(false);
                                }}
                            >
                                <Text style={item === temp.getFullYear() ? { color: "white" } : undefined}>{item}</Text>
                            </Pressable>
                        )}
                    />
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
    yearLabel: {
        fontSize: 18,
        fontFamily: "Sora-Bold",
        marginBottom: 10,
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    dayItem: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    yearContainer: {
        padding: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    yearItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
});