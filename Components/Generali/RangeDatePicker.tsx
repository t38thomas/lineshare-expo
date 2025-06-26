import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat, mesi } from "@/utils/DateFormat";
<<<<<<< HEAD
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";
=======
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
>>>>>>> main

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
<<<<<<< HEAD
    const [yearSheet, setYearSheet] = useState<"start" | "end" | undefined>(undefined);
    const [yearQuery, setYearQuery] = useState("");
    const [yearPage, setYearPage] = useState(1);

    useEffect(() => {
        setYearPage(1);
    }, [yearQuery]);
=======
>>>>>>> main

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
<<<<<<< HEAD
        setYearSheet(undefined);
        setYearQuery("");
        setYearPage(1);
=======
>>>>>>> main
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

<<<<<<< HEAD
    const filteredYears = useMemo(() => {
        return years.filter((y) => y.toString().includes(yearQuery));
    }, [years, yearQuery]);

    const yearPageSize = 20;
    const displayedYears = useMemo(() => {
        return filteredYears.slice(0, yearPage * yearPageSize);
    }, [filteredYears, yearPage]);

=======
>>>>>>> main
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
<<<<<<< HEAD
                    <Pressable onPress={() => setYearSheet('start')}>
                        <Text style={styles.yearLabel}>{start.getFullYear()}</Text>
                    </Pressable>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.selectScroll, { marginVertical: 10 }]}> 
                        {mesi.map((m, idx) => (
                            <Pressable key={"sm" + idx} onPress={() => selectMonthStart(idx)} style={[styles.item, idx === start.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={idx === start.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.daysGrid}> 
                        {daysStart.map((d) => (
                            <Pressable key={"sd" + d} onPress={() => selectDayStart(d)} style={[styles.dayItem, d === start.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={d === start.getDate() ? { color: "white" } : undefined}>{d}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={[styles.label, { marginTop: 20 }]}>Al</Text>
                    <Pressable onPress={() => setYearSheet('end')}>
                        <Text style={styles.yearLabel}>{end.getFullYear()}</Text>
                    </Pressable>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.selectScroll, { marginVertical: 10 }]}> 
                        {mesi.map((m, idx) => (
                            <Pressable key={"em" + idx} onPress={() => selectMonthEnd(idx)} style={[styles.item, idx === end.getMonth() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={idx === end.getMonth() ? { color: "white" } : undefined}>{m.nome.slice(0,3)}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.daysGrid}> 
                        {daysEnd.map((d) => (
                            <Pressable key={"ed" + d} onPress={() => selectDayEnd(d)} style={[styles.dayItem, d === end.getDate() && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={d === end.getDate() ? { color: "white" } : undefined}>{d}</Text>
                            </Pressable>
                        ))}
=======
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
>>>>>>> main
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={confirm} width={150}>
                            <Text style={useButtonText()}>Conferma</Text>
                        </Button>
                    </View>
                </View>
            </BottomSheet>
<<<<<<< HEAD

            <BottomSheet visible={yearSheet !== undefined} onRequestClose={() => setYearSheet(undefined)}>
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
                                style={[styles.yearItem, item === (yearSheet === 'start' ? start.getFullYear() : end.getFullYear()) && { backgroundColor: theme.colors.lineshare }]}
                                onPress={() => {
                                    if (yearSheet === 'start') selectYearStart(item); else selectYearEnd(item);
                                    setYearSheet(undefined);
                                }}
                            >
                                <Text style={item === (yearSheet === 'start' ? start.getFullYear() : end.getFullYear()) ? { color: 'white' } : undefined}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </BottomSheet>
=======
>>>>>>> main
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
<<<<<<< HEAD
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
=======
>>>>>>> main
});
