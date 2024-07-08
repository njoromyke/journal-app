import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  roundness: 5,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6A3EA1",
    secondary: "#F7F6D4",
    background: "#FAF8FC",
    tabBackground: "#F0F2F8",
    onPrimary: "#FFFFFF",
    onSecondary: "#ffffff",
    success: "#00C851",
    onSuccess: "#ffffff",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 5,
  version: 3,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#3A2258",
    secondary: "#565510",
    success: "#00C851",
    onSuccess: "#ffffff",
  },
};
