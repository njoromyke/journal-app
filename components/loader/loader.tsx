import React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

type Props = {
  size?: number | "small" | "large";
};

const Loader = ({ size }: Props) => {
  const theme = useTheme();
  return <ActivityIndicator size={size} animating color={theme.colors.primary} />;
};

export default Loader;
