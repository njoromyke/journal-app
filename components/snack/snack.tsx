import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
type Props = {
  onPress: () => void;
  message: string;
};
const Snack = ({ message, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible
        onDismiss={onPress}
        action={{
          label: "Undo",
          onPress: () => {
            onPress();
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default Snack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
