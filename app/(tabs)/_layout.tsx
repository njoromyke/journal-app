import { Redirect, Tabs } from "expo-router";
import React, { useContext } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import AuthContext from "@/context/auth-context";
import { useTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const theme = useTheme();
  const { token, loading } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  if (loading) {
    return null;
  }

  if (!token && !loading) {
    <Redirect href="/home" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? theme.colors.secondary : theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
