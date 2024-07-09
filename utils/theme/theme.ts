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
    grey: {
      50: "#F5F5F5",
      100: "#EEEEEE",
      200: "#E0E0E0",
      300: "#BDBDBD",
      400: "#9E9E9E",
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
      900: "#000000",
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 5,
  version: 3,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#3A2258",
    secondary: "#DEDC52",
    success: "#00C851",
    onSuccess: "#ffffff",
    onPrimary: "#FFFFFF",
    onSecondary: "#ffffff",
    grey: {
      50: "#F5F5F5",
      100: "#EEEEEE",
      200: "#E0E0E0",
      300: "#BDBDBD",
      400: "#9E9E9E",
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
      900: "#000000",
    },
  },
};
