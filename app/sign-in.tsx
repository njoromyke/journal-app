import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Snack from "@/components/snack/snack";
import { postData } from "@/utils/api";
import { setStorageItemAsync } from "@/hooks/useStorageState";
import config from "@/utils/config/global-config";

type SignIn = {
  email: string;
  password: string;
};

const SignIn = () => {
  const theme = useTheme();
  const router = useRouter();

  const [userData, setUserData] = useState<SignIn>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = () => {
    router.push("sign-up");
  };

  const onSubmit = async () => {
    if (userData.email === "" || userData.password === "") {
      setError("Please fill in the required fields");
      setShowSnackbar(true);
    } else {
      setLoading(true);
      const url = "/api/users/login";

      const { email, password } = userData;

      const { success, data, error } = await postData(url, { email, password });

      if (success) {
        await setStorageItemAsync(config.STORAGE_KEY, data?.user?.token);

        router.replace("(tabs)");
      } else {
        setError(error || "An error occurred");
        setShowSnackbar(true);
      }
      setLoading(false);
    }
  };

  const onDismissSnackBar = () => setShowSnackbar(false);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 20,
      }}
    >
      <ScrollView>
        <View style={styles.view}>
          <Text style={styles.header} variant="headlineLarge">
            Let's Login
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: "grey.300",
            }}
          >
            Add Notes to your idea
          </Text>

          <TextInput
            label="Email"
            mode="outlined"
            theme={{
              roundness: 10,
            }}
            style={{
              height: 60,
              borderRadius: 20,
            }}
            value={userData?.email || ""}
            keyboardType="email-address"
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

          <Button mode="contained" style={styles.button} onPress={onSubmit}>
            Login
          </Button>

          <Button mode="text" style={styles.button} onPress={navigate}>
            Don't Have an Account ? Sign Up
          </Button>
        </View>
      </ScrollView>
      {showSnackbar && <Snack message={error} onPress={onDismissSnackBar} />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  view: {
    marginVertical: 40,
    flex: 1,
    display: "flex",
    gap: 40,
  },
  header: {
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    paddingVertical: 8,
  },
});
