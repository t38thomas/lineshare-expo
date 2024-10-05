
import { DarkTheme, LightTheme } from "@/Context/Theme/Theme";
import useTheme from "@/hooks/useTheme";
import React, { PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, Keyboard, Modal, Pressable, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { SlideInDown, clamp, measure, runOnJS, runOnUI, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Text from "./Text";
import ColorBar from "./ColorBar/ColorBar";

type SnapPointsType = `${number}%` | number

export type BottomSheetProps = {
    visible: boolean,
    closeClickOutside?: boolean,
} & BottomSheetComponentProps

function mapValue(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
    "worklet"
    return outputMin - ((input - inputMin) * (outputMin - outputMax)) / (inputMax - inputMin);
}

const DefaultBottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {


    const [isOpen, setIsOpen] = useState<boolean>(props.visible);
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const theme = useTheme();

    useEffect(() => {
        if (props.visible) {
            setIsOpen(true);

        }
        else {
            close(true).then(_ => setIsOpen(false))
        }
    }, [props.visible])

    useImperativeHandle(ref, () => ({
        close: close ?? (async () => { console.log("close non definito") }),
    }), [])

    const close = async (firstTime?: boolean) => {
        Keyboard.dismiss();
        await bottomSheetRef.current?.close();
        if (!firstTime) props.onRequestClose();
    }

    return (
        <Modal
            visible={isOpen}
            animationType="fade"
            transparent
            onRequestClose={() => close()}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <BottomSheetComponent {...props} ref={bottomSheetRef} onRequestClose={close} />
                </GestureHandlerRootView>
            </SafeAreaView>
        </Modal>
    )
});


type BottomSheetComponentProps = PropsWithChildren<{
    snapPoints?: SnapPointsType[],
    auto?: boolean,
    onRequestClose: () => void,
    contentContainerStyle?: ViewStyle,
    style?: ViewStyle
    disableScrollView?: boolean
    customHandle?: React.ReactElement
    title?: string
} & Omit<HandleProps, "title">>

export type BottomSheetRef = {
    close: () => Promise<void>,
}

function calcSnapPointDimension(snapPoints: SnapPointsType[] | undefined, heightOfWindow: number) {
    if (snapPoints) {
        return snapPoints.flatMap<number>((snap) => {
            if (typeof snap === "string") return (parseInt(snap) / 100) * heightOfWindow;
            else return snap;
        }).sort()
    }
    else return [];
}

export const BottomSheetComponent = forwardRef<BottomSheetRef, BottomSheetComponentProps>(function (props, ref) {

    const viewRef = useAnimatedRef();
    const heightOfWindow = useRef<number>(Dimensions.get("window").height).current
    const [snapSelected, setSnapSelected] = useState<number>(0);
    const [snapPointsDimension, setSnapPointDimension] = useState<number[]>(calcSnapPointDimension(props.snapPoints, heightOfWindow));
    const height = useSharedValue<number | undefined>(props.auto ? undefined : snapPointsDimension?.[0]);
    const borderRadius = useSharedValue<number>(25);

    const requestClose = () => {
        if (height.value === undefined) {
            runOnUI(calculateHeight)();
        }
        return new Promise<void>((resolve, reject) => {
            height.value = withTiming(0, undefined, (finished) => {
                if (finished) {
                    runOnJS(resolve)();
                }
            })
        });
    }

    const calculateHeight = () => {
        'worklet';
        const dim = measure(viewRef);
        if (dim) {
            height.value = dim?.height
        }
    };

    useImperativeHandle(ref, () => ({
        close: requestClose,
    }), [])

    const style = useAnimatedStyle(() => {
        return {
            height: height.value,
            borderTopLeftRadius: mapValue(height.value ?? 0, 0, heightOfWindow, 40, 0),
            borderTopRightRadius: mapValue(height.value ?? 0, 0, heightOfWindow, 40, 0),
            overflow: "hidden"
        }
    }, [height.value])

    const close = () => {
        props.onRequestClose();
    }

    const Pan = Gesture
        .Pan()
        .onBegin((event) => {
            if (height.value === undefined) {
                calculateHeight();
                if (height.value) {
                    const newArray = [...snapPointsDimension];
                    newArray.push(height.value);
                    newArray.sort();
                    runOnJS(setSnapPointDimension)(newArray);
                }
            }
        })
        .onChange((event) => {
            if (height.value) {
                const newValue = height.value - event.changeY;
                if (newValue >= heightOfWindow) return
                height.value = newValue;
            }
        })
        .onEnd((event) => {
            if (height.value) {
                // VERSO SOPRA
                if (event.velocityY < 0) {
                    if ((-event.velocityY) > 70 && (snapSelected !== (snapPointsDimension.length - 1))) {
                        for (let i = snapSelected + 1; i < snapPointsDimension.length; i++) {
                            if (height.value < snapPointsDimension[i]) {
                                height.value = withSpring(snapPointsDimension[i], { dampingRatio: 0.7 });
                                runOnJS(setSnapSelected)(i);
                                return;
                            }
                        }

                    }
                    else {
                        height.value = withSpring(snapPointsDimension[snapSelected], { dampingRatio: 0.7 })
                    }
                }
                else {
                    if (event.velocityY > 70) {
                        if (height.value < snapPointsDimension[0]) {
                            runOnJS(close)();
                            return;
                        }

                        for (let i = 0; i < snapPointsDimension.length - 1; i++) {
                            if (height.value >= snapPointsDimension[i] && height.value <= snapPointsDimension[i + 1]) {
                                height.value = withSpring(snapPointsDimension[i], { dampingRatio: 0.7 });
                                runOnJS(setSnapSelected)(i);
                                return;
                            }
                        }

                        height.value = withSpring(snapPointsDimension[snapSelected], { dampingRatio: 0.7 })

                    }
                    else {
                        height.value = withSpring(snapPointsDimension[snapSelected], { dampingRatio: 0.7 })
                    }
                }
            }
        })

    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "rgba(0,0,0,0.3)" }}>
            <Pressable style={{ flex: 1, cursor: "auto" }} onPress={close} />
            <Animated.View ref={viewRef} entering={SlideInDown} style={[{ backgroundColor: "white" }, style, props.style,]} >
                <GestureDetector touchAction="pan-y" gesture={Pan} >
                    <View style={{ flexGrow: 1 }}>

                        {
                            props.customHandle ?? <Handle
                                title={props.title}
                                handleContainerStyle={props.handleContainerStyle}
                                handleStyle={props.handleStyle}
                                removeHandle={props.removeHandle}
                            />
                        }

                        {props.children}
                    </View>
                </GestureDetector>
            </Animated.View>
        </View>

    )

})

interface HandleProps {
    title?: string
    removeHandle?: boolean
    handleStyle?: StyleProp<ViewStyle>
    handleContainerStyle?: StyleProp<ViewStyle>
}

const Handle = (props: HandleProps) => {
    const style = StyleSheet.create({
        handle: {
            height: 3.5,
            width: 45,
            position: 'absolute',
            backgroundColor: "black",
            top: 10,
            borderRadius: 100

        },
        handleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",

        },
        title: {
            paddingTop: props.removeHandle ? 12.5 : 25,
            paddingBottom: 12.5,
            fontWeight: 'bold',
            fontSize: 15
        }
    })
    return (
        <View style={[style.handleContainer, props.handleContainerStyle]}>

            <View style={[style.handle, props.removeHandle ? { height: 0 } : null, props.handleStyle]}></View>
            {
                props.title ?
                    <>
                        <Text style={style.title}>{props.title}</Text>
                        <View style={{ width: '130%', height: 1, backgroundColor: "rgba(0,0,0,0.1)", marginBottom: 12.5 }}></View>
                    </>
                    :
                    <View style={{ paddingTop: 25 }}></View>
            }

        </View>
    )
}


/**
 * Themed BottomSheet
 */
const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {

    const theme = useTheme();

    return (
        <DefaultBottomSheet
            {...props}
            ref={ref}
            style={{ backgroundColor: theme.isDarkTheme ? DarkTheme.secondary : LightTheme.background, ...props.style }}
            handleStyle={[{ backgroundColor: theme.isDarkTheme ? "gray" : LightTheme.lineshare }, props.handleStyle]}
        />
    )
})

export default BottomSheet;