import { StyleSheet, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useTheme, Text, TextInput, Button, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { putData } from "@/utils/api";
import Snack from "@/components/snack/snack";

type ChangeProfile = {
  password: string;
  name: string;
  email: string;
};

const ProfileId = () => {
  const { profileId } = useLocalSearchParams();
  const { user } = useAuth();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [userData, setUserData] = useState<ChangeProfile>({
    password: "",
    name: "",
    email: "",
  });

  const onSubmit = async () => {
    setLoading(true);
    const url = `api/users/user/${profileId}`;

    const { name, email, password } = userData;

    const { success, error } = await putData(url, { name, email, password });

    if (success) {
      setMessage("Profile updated successfully");
      setShowSnackbar(true);
      router.navigate("profile");
    } else {
      setMessage(error || "An error occurred");
      setShowSnackbar(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      setUserData({
        password: user.password,
        name: user.name,
        email: user.email,
      });
    }
  }, [user?.id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Profile" />
      </Appbar>

      <ScrollView>
        <View style={styles.view}>
          <Text style={styles.header} variant="headlineLarge">
            Change Profile
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: colorScheme === "dark" ? "white" : "grey.300",
            }}
          >
            Add start taking journals
          </Text>

          <TextInput
            label="Name"
            placeholder="John Doe"
            mode="outlined"
            theme={{
              roundness: 10,
            }}
            style={{
              height: 60,
              borderRadius: 20,
            }}
            value={userData?.name || ""}
            onChangeText={(name) => setUserData({ ...userData, name })}
          />
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            theme={{
              roundness: 10,
            }}
            style={{
              height: 60,
              borderRadius: 20,
            }}
            value={userData?.email || ""}
            onChangeText={(email) => setUserData({ ...userData, email })}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                size={30}
                onPress={togglePassword}
                style={{
                  marginTop: 10,
                }}
              />
            }
            value={userData?.password || ""}
            onChangeText={(password) => setUserData({ ...userData, password })}
            theme={{
              roundness: 10,
            }}
            style={{
              height: 60,
              borderRadius: 20,
              justifyContent: "center",
            }}
          />
          <Button mode="contained" style={styles.button} onPress={onSubmit} textColor="white" loading={loading}>
            Change Profile
          </Button>

          {showSnackbar && <Snack message={message} onPress={() => setShowSnackbar(false)} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileId;

const styles = StyleSheet.create({
  view: {
    marginVertical: 40,
    flex: 1,
    display: "flex",
    gap: 40,
    padding: 20,
  },
  header: {
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    paddingVertical: 8,
  },
});
