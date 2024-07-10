import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { AuthProvider } from "@/context/auth-provider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { darkTheme, lightTheme } from "@/utils/theme/theme";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, ThemeProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "app",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <GestureHandlerRootView>
              <Slot />
            </GestureHandlerRootView>
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
