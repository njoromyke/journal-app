import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, useTheme, Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Journal } from "../types/types";
import { getData, postData } from "@/utils/api";
import { router } from "expo-router";
import DatePicker from "@/components/date-picker/date";
import { Picker } from "@react-native-picker/picker";
import Snack from "@/components/snack/snack";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

const AddJournal = () => {
  const colorScheme = useColorScheme();
  const [journal, setJournal] = useState<Journal>({
    title: "",
    content: "",
    categoryId: "",
    date: new Date(),
  });
  const theme = useTheme();
  const [message, setMessage] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleSnackbar = () => setShowSnackbar(!showSnackbar);

  const onSubmit = async () => {
    if (journal.title === "" || journal.content === "" || journal.categoryId === "") {
      setMessage("Please fill in the required fields");
      toggleSnackbar();
    } else {
      const url = "/api/journals";

      const { title, content, categoryId, date } = journal;

      const { success, error } = await postData(url, { title, content, categoryId, date });

      if (success) {
        setMessage("Journal added successfully");
        toggleSnackbar();
        router.push("(tabs)");
      } else {
        setMessage(error || "An error occurred");
        toggleSnackbar();
      }
    }
  };

  const fetchCategories = async () => {
    const url = "/api/category";
    const { data } = await getData(url);
    setCategories(data?.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Journal" />
      </Appbar>

      <ScrollView>
        <View style={styles.view}>
          <Text style={styles.header} variant="headlineLarge">
            Add Journal
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: colorScheme === "dark" ? "white" : "grey.300",
            }}
          >
            And start taking journals
          </Text>

          <TextInput
            label="Title"
            mode="outlined"
            value={journal?.title || ""}
            onChangeText={(text) => setJournal({ ...journal, title: text })}
          />
          <DatePicker label="Date" selectedDate={journal.date} setSelectedDate={(date) => setJournal({ ...journal, date })} />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colorScheme === "dark" ? "grey" : "grey",
            }}
          >
            <Picker
              selectedValue={journal.categoryId}
              onValueChange={(itemValue) => setJournal({ ...journal, categoryId: itemValue as string })}
              mode="dropdown"
              selectionColor={theme.colors.primary}
              style={{
                height: 50,
                color: colorScheme === "dark" ? "white" : "black",
              }}
              dropdownIconColor={colorScheme === "dark" ? "white" : "black"}
            >
              {categories?.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.id} />
              ))}
            </Picker>
          </View>
          <TextInput
            label="Content"
            mode="outlined"
            multiline
            numberOfLines={10}
            value={journal?.content || ""}
            onChangeText={(text) => setJournal({ ...journal, content: text })}
          />
          <Button
            style={{
              borderRadius: 5,
            }}
            mode="contained"
            onPress={() => onSubmit()}
            textColor="white"
            loading={loading}
          >
            Submit
          </Button>
          {showSnackbar && <Snack message={message} onPress={() => setShowSnackbar(false)} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddJournal;

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
