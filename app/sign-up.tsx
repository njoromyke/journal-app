import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Snack from "@/components/snack/snack";
import { postData } from "@/utils/api";
import { setStorageItemAsync } from "@/hooks/useStorageState";
import config from "@/utils/config/global-config";

type SignUp = {
  email: string;
  password: string;
  name: string;
};

const SignUp = () => {
  const theme = useTheme();
  const router = useRouter();

  const [userData, setUserData] = useState<SignUp>({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = () => {
    router.push("sign-in");
  };

  const onDismissSnackBar = () => setShowSnackbar(false);

  const onSubmit = async () => {
    if (userData.email === "" || userData.password === "" || userData.name === "") {
      setError("Please fill in the required fields");
      setShowSnackbar(true);
    } else {
      const url = "/api/users";

      const { name, email, password } = userData;

      const { success, data, error } = await postData(url, { name, email, password });

      if (success) {
        await setStorageItemAsync(config.STORAGE_KEY, data?.user?.token);

        console.log(data);

        router.replace("(tabs)");
      } else {
        setError(error || "An error occurred");
        setShowSnackbar(true);
      }
    }
  };

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
            Register
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: "grey.300",
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
          <Button mode="contained" style={styles.button} onPress={onSubmit}>
            Register
          </Button>

          <Button mode="text" style={styles.button} onPress={navigate}>
            Have an Account ? Sign In
          </Button>
        </View>
      </ScrollView>
      {showSnackbar && <Snack message={error} onPress={onDismissSnackBar} />}
    </SafeAreaView>
  );
};

export default SignUp;

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
