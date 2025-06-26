import BottomSheet from "./BottomSheet";
import Button, { useButtonText } from "./Button";
import Text from "./Text";
import useTheme from "@/hooks/useTheme";
import { DateFormat } from "@/utils/DateFormat";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Calendar from "./Calendar";

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

    const onSelect = useCallback((d: Date) => {
        setTemp(d);
    }, []);

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
                        date={temp}
                        onSelect={onSelect}
                        minimumDate={props.minimumDate}
                        maximumDate={props.maximumDate}
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