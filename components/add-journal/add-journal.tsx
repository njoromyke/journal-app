import { Category } from "@/app/types/types";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import { Button, Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import DatePicker from "../date-picker/date";
import Snack from "../snack/snack";
import { postData } from "@/utils/api";
registerTranslation("en", enGB);

type Props = {
  onClose: () => void;
  title: string;
  categories?: Category[];
};

type Journal = {
  title: string;
  content: string;
  categoryId: string;
  date: Date;
  category?: Category;
};

const AddJournal = ({ onClose, title, categories }: Props) => {
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

  const toggleSnackbar = () => setShowSnackbar(!showSnackbar);

  const onSubmit = async () => {
    if (journal.title === "" || journal.content === "" || journal.categoryId === "") {
      setMessage("Please fill in the required fields");
      toggleSnackbar();
    } else {
      const url = "api/journals";

      const { title, content, categoryId, date } = journal;

      const { success, error } = await postData(url, { title, content, categoryId, date });

      if (success) {
        setMessage("Journal added successfully");
        toggleSnackbar();
        onClose();
      } else {
        setMessage(error || "An error occurred");
        toggleSnackbar();
      }
    }
  };

  return (
    <Portal theme={theme}>
      <Dialog
        visible
        onDismiss={onClose}
        style={{
          width: "90%",
          borderRadius: 20,
        }}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24, gap: 14 }}>
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
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => onClose()} textColor={theme.colors.error}>
            Cancel
          </Button>
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
        </Dialog.Actions>
      </Dialog>

      {showSnackbar && <Snack message={message} onPress={toggleSnackbar} />}
    </Portal>
  );
};

export default AddJournal;
