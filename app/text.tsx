import AuthContext from "@/context/auth-context";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { Text } from "react-native";

const Index = () => {
  const { token, loading } = useContext(AuthContext);
  console.log("loading", loading);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(loading, "loading");

  if (!token && !loading) {
    return <Redirect href="/home" />;
  }

  return <Stack />;
};

export default Index;
