import useTheme from "@/hooks/useTheme";
import HomeTabIcon from "@/Screens/Home/Components/HomeTabIcon";
import ProfileTabIcon from "@/Screens/Profile/Components/ProfileTabIcon";
import TestTabIcon from "@/Screens/Test/Components/TestTabIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {

    const theme = useTheme();

    return (
        <Tabs
            safeAreaInsets={{ bottom: 0 }}

            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: theme.colors.lineshare,
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: theme.colors.background
                }

            }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: HomeTabIcon,

                }}

            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ProfileTabIcon,
                }}
            />

            <Tabs.Screen
                name="test"
                options={{
                    tabBarIcon: TestTabIcon,
                }}
            />

        </Tabs>
    )
}