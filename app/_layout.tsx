import ThemeContextProvider from '@/Context/Theme/ThemeContext';
import useTheme from '@/hooks/useTheme';
import { Store } from '@/utils/Store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (
    <GestureHandlerRootView>
      <ThemeContextProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AppEntry />
        </SafeAreaView>
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}


const AppEntry = () => {

  const theme = useTheme();

  const [fontsLoaded, error] = useFonts({
    "Sora-Bold": require('../assets/fonts/Sora-Bold.ttf'),
    "Sora-Medium": require('../assets/fonts/Sora-Medium.ttf'),
    "Sora-Regular": require('../assets/fonts/Sora-Regular.ttf'),

  });

  const appReady = useMemo(() => {
    return fontsLoaded;
  }, [fontsLoaded])

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <Stack
      initialRouteName='login'
      screenOptions={{
        headerShown: false,
        statusBarColor: theme.colors.background,
        navigationBarColor: theme.colors.background
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

const screenOptions = {
}