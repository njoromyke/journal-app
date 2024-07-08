import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/hooks/useSession";
import Loader from "@/components/loader/loader";
import AuthContext from "@/context/auth-context";

const Index = () => {
  const { token, loading } = useContext(AuthContext);
  console.log("loading", loading);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token && !loading) {
    return <Redirect href="/home" />;
  }

  return <Stack />;
};

export default Index;
