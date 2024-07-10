import Loader from "@/components/loader/loader";
import AuthContext from "@/context/auth-context";
import { getStorageItemAsync } from "@/hooks/useStorageState";
import config from "@/utils/config/global-config";
import { Redirect, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const theme = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    setLoading(true);
    const token = await getStorageItemAsync(config.STORAGE_KEY);
    setToken(token);
    setLoading(false);
  }

  if (!loading && !token) {
    return <Redirect href="/home" />;
  } else {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
          padding: 20,
        }}
      >
        <Loader size="large" />
      </SafeAreaView>
    );
  }
};

export default Home;
