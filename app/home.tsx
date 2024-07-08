import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Text, useTheme } from "react-native-paper";

const Home = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.primary,
        flex: 1,
        padding: 20,
      }}
    >
      <Image source={require("@/assets/images/home-illustration.png")} style={styles.home} fadeDuration={300} />

      <View style={styles.view}>
        <Text variant="headlineSmall">Jot down anything you want to achieve, today or in the future</Text>
        <View style={styles.dots}>
          <Icon source="circle" size={15} color={theme.colors.secondary} />
          <Icon source="circle" size={15} />
          <Icon source="circle" size={15} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    alignSelf: "center",
    height: "40%",
    width: "100%",
    resizeMode: "contain",
    flex: 0.5,
  },
  view: {
    marginVertical: 40,
    flex: 0.5,
    display: "flex",
    gap: 50,
  },
  dots: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
