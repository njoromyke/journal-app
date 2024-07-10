import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Category } from "../types/types";
import { postData } from "@/utils/api";
import Snack from "@/components/snack/snack";

const AddCat = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category>({
    name: "",
    id: "",
  });
  const [message, setMessage] = useState("");
  const [showSnack, setShowSnack] = useState(false);

  const onSubmit = async () => {
    if (!category.name) {
      setMessage("Name is required");
      setShowSnack(true);
      return;
    }

    setLoading(true);

    const url = "/api/category";
    const { name } = category;

    const { error, success } = await postData(url, { name });

    if (success) {
      setShowSnack(true);
      setMessage("Operation completed successfully.");

      router.navigate("/categories");
    }

    if (error) {
      setShowSnack(true);
      setMessage(error || "An Error occurred!");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Category" />
      </Appbar>
      <View style={styles.container}>
        <TextInput
          label="Category Name"
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={{
            height: 60,
            borderRadius: 20,
          }}
          value={category?.name || ""}
          onChangeText={(text) => setCategory({ ...category, name: text as string })}
        />

        <Button mode="contained" loading={loading} style={styles.button} onPress={onSubmit} disabled={loading}>
          Add Category
        </Button>
      </View>

      {showSnack && <Snack message={message} onPress={() => setShowSnack(false)} />}
    </SafeAreaView>
  );
};

export default AddCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 70,
  },
  button: {
    width: "100%",
    paddingVertical: 8,
  },
});
