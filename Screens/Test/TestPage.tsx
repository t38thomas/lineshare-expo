import Background from "@/Components/Generali/Background";
import Button, { buttonStyles, useButtonText } from "@/Components/Generali/Button";
import Icon from "@/Components/Generali/Icon";
import Text from "@/Components/Generali/Text";
import { View } from "react-native";

export default function TestPage() {

    const dis = true;

    const textStyle1 = useButtonText();
    const textStyle2 = useButtonText(dis);

    return (
        <Background>
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", marginRight: 20 }}>
                <Button>
                    <Text style={textStyle1}>Accedi</Text>
                </Button>

                <View style={{ marginLeft: 20 }}>
                    <Button disabledAll={dis} >
                        <Text style={textStyle2}>Next <Icon name="arrow-right" size={17} color="gray" /></Text>
                    </Button>
                </View>
            </View>

        </Background>
    )
}