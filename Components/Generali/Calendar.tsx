import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import useTheme from '@/hooks/useTheme';
import BottomSheet from './BottomSheet';
import Text from './Text';
import Icon from './Icon';
import { mesi } from '@/utils/DateFormat';

export type CalendarProps = {
    /** currently selected date */
    date: Date;
    /** callback when user selects a day */
    onSelect: (day: Date) => void;
    minimumDate?: Date;
    maximumDate?: Date;
    /** optional function to decide if a day should appear selected */
    isSelected?: (day: Date) => boolean;
    style?: StyleProp<ViewStyle>;
};

export default function Calendar(props: CalendarProps) {
    const theme = useTheme();
    const [month, setMonth] = useState(props.date.getMonth());
    const [year, setYear] = useState(props.date.getFullYear());
    const [yearSheet, setYearSheet] = useState(false);
    const [yearQuery, setYearQuery] = useState('');
    const [yearPage, setYearPage] = useState(1);

    useEffect(() => {
        setMonth(props.date.getMonth());
        setYear(props.date.getFullYear());
    }, [props.date]);

    useEffect(() => { setYearPage(1); }, [yearQuery]);

    const daysInMonth = useCallback((y: number, m: number) => new Date(y, m + 1, 0).getDate(), []);

    const years = useMemo(() => {
        const current = new Date().getFullYear();
        const start = props.minimumDate?.getFullYear() ?? current - 100;
        const end = props.maximumDate?.getFullYear() ?? current + 10;
        const arr: number[] = [];
        for (let y = start; y <= end; y++) arr.push(y);
        return arr;
    }, [props.minimumDate, props.maximumDate]);

    const filteredYears = useMemo(() => years.filter(y => y.toString().includes(yearQuery)), [years, yearQuery]);
    const yearPageSize = 20;
    const displayedYears = useMemo(() => filteredYears.slice(0, yearPage * yearPageSize), [filteredYears, yearPage]);

    const days = useMemo(() => Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1), [year, month, daysInMonth]);

    const prevMonth = useCallback(() => {
        setMonth(m => {
            if (m === 0) { setYear(y => y - 1); return 11; }
            return m - 1;
        });
    }, []);

    const nextMonth = useCallback(() => {
        setMonth(m => {
            if (m === 11) { setYear(y => y + 1); return 0; }
            return m + 1;
        });
    }, []);

    const selectYear = useCallback((y: number) => { setYear(y); setYearSheet(false); }, []);

    const onSelect = useCallback((d: number) => {
        const selected = new Date(year, month, d);
        props.onSelect(selected);
    }, [year, month, props.onSelect]);

    return (
        <View style={[styles.container, props.style]}> 
            <View style={styles.header}> 
                <Pressable onPress={prevMonth} style={styles.arrow}><Icon name="chevron-left" size={24} /></Pressable>
                <Pressable onPress={() => setYearSheet(true)} style={styles.monthLabel}>
                    <Text style={styles.headerText}>{mesi[month].nome} {year}</Text>
                </Pressable>
                <Pressable onPress={nextMonth} style={styles.arrow}><Icon name="chevron-right" size={24} /></Pressable>
            </View>
            <View style={styles.daysGrid}>
                {days.map(d => {
                    const dateObj = new Date(year, month, d);
                    const selected = props.isSelected ? props.isSelected(dateObj) : (props.date.getDate() === d && props.date.getMonth() === month && props.date.getFullYear() === year);
                    return (
                        <Pressable key={d} style={[styles.dayItem, selected && { backgroundColor: theme.colors.lineshare }]} onPress={() => onSelect(d)}>
                            <Text style={selected ? { color: 'white' } : undefined}>{d}</Text>
                        </Pressable>
                    );
                })}
            </View>
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
                        keyExtractor={item => item.toString()}
                        onEndReached={() => { if (displayedYears.length < filteredYears.length) setYearPage(p => p + 1); }}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => selectYear(item)} style={[styles.yearItem, item === year && { backgroundColor: theme.colors.lineshare }]}> 
                                <Text style={item === year ? { color: 'white' } : undefined}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    arrow: {
        padding: 5,
        borderRadius: 20,
    },
    monthLabel: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Sora-Bold',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dayItem: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
