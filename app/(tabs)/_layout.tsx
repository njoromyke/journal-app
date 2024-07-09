import { Slot, SplashScreen, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import AuthContext from "@/context/auth-context";
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

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
