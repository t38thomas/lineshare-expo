import Background from "@/Components/Generali/Background";
import Text from "@/Components/Generali/Text";
import AnimatedTextInput from "@/Components/TextInputs/AnimatedTextInput";
import TextInput from "@/Components/TextInputs/TextInput";
import { Validation } from "@/utils/Validation";
import { ScrollView, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function TestPage() {
    return (
        <Background>

            <ScrollView contentContainerStyle={{ flex: 1, marginHorizontal: 10, marginTop: 200, alignItems: "center" }}>
                <AnimatedTextInput
                    width={300}
                    placeholder="Email"
                    validation={Validation.email}
                />


            </ScrollView>
        </Background>
    )
}