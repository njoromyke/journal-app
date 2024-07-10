import { Alert, StyleSheet, useColorScheme, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, IconButton, useTheme, Button, Divider, List } from "react-native-paper";
import AuthContext from "@/context/auth-context";
import { getData } from "@/utils/api";
import { User } from "@/context/types/user";
import { setStorageItemAsync } from "@/hooks/useStorageState";
import config from "@/utils/config/global-config";
import { Link, router } from "expo-router";

const Profile = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const colorScheme = useColorScheme();

  const logout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await setStorageItemAsync(config.STORAGE_KEY, null);
          router.replace("sign-in");
        },
      },
    ]);
  };

  const fetchUser = async () => {
    const url = "/api/users/user/me";
    const { success, data } = await getData(url, {});

    if (success) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <View style={styles.profile}>
        <IconButton size={80} style={{ backgroundColor: theme.colors.primary }} icon="account" />
        <View style={styles.texts}>
          <Text variant="headlineSmall">{user?.name}</Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "grey" : "grey.300",
            }}
            variant="bodyMedium"
          >
            {user?.email}
          </Text>
        </View>
      </View>
      <Link href={`/profile/${user?.id}`} asChild>
        <Button mode="contained" icon={({}) => <IconButton icon="account-edit" size={25} iconColor="white" />}>
          Edit Profile
        </Button>
      </Link>
      <Divider
        style={{
          marginVertical: 20,
        }}
      />

      <List.Section>
        <List.Item title="Change Password" left={() => <List.Icon icon="key" />} onPress={() => {}} />
        <List.Item title="Delete Account" left={() => <List.Icon icon="delete" />} onPress={() => {}} />
        <List.Item title="Privacy Policy" left={() => <List.Icon icon="shield" />} onPress={() => {}} />
        <List.Item title="Terms of Service" left={() => <List.Icon icon="file-document" />} onPress={() => {}} />
      </List.Section>
      <Divider
        style={{
          marginVertical: 20,
        }}
      />
      <View style={styles.logout}>
        <List.Item
          title="Logout"
          left={() => <List.Icon icon="logout" />}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: 5,
    alignItems: "center",
  },
  texts: {
    flex: 1,
    marginLeft: 20,
  },
  logout: {
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
});
