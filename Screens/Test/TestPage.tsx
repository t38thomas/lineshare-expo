import Background from "@/Components/Generali/Background";
import BottomSheet from "@/Components/Generali/BottomSheet";
import Button, { useButtonText } from "@/Components/Generali/Button";
import Icon from "@/Components/Generali/Icon";
import IconPressable from "@/Components/Generali/IconPressable";
import Text from "@/Components/Generali/Text";
import AnimatedTextInput from "@/Components/TextInputs/AnimatedTextInput";
import useTheme from "@/hooks/useTheme";
import { Validation } from "@/utils/Validation";
import React, { useState } from "react";
import { View } from "react-native";

export default function TestPage() {

    const [visible1, setVisible1] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)

    const style = useButtonText();

    const theme = useTheme();

    return (
        <Background>

            <BottomSheet snapPoints={["50%", "100%"]} visible={visible1} onRequestClose={() => setVisible1(false)} >
                <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                    <AnimatedTextInput
                        containerStyle={{ backgroundColor: theme.isDarkTheme ? theme.colors.background : theme.colors.secondary }}
                        placeholder="Email"
                        validation={Validation.email}
                    />
                </View>
            </BottomSheet>

            <BottomSheet snapPoints={["75%"]} auto visible={visible2} onRequestClose={() => setVisible2(false)} title="Confermato!">
                <View style={{ alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
                    <Icon
                        name="check-circle-outline"
                        size={150}
                        color={theme.colors.lineshare}
                    />
                </View>
            </BottomSheet>

            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                <Button onPress={() => setVisible1(true)}>
                    <Text style={style}>Uno</Text>
                </Button>

                <Button onPress={() => setVisible2(true)}>
                    <Text style={style}>Due</Text>
                </Button>
            </View>

        </Background>
    )
}