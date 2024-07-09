import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Dialog, Divider, Modal, PaperProvider, Portal, Text, TextInput, useTheme } from "react-native-paper";
import { Category } from "@/app/types/types";

type Props = {
  onClose: () => void;
  title: string;
  onAction: () => void;
};

type Journal = {
  title: string;
  content: string;
  categoryId: string;
  date: Date;
};

const AddJournal = ({ onAction, onClose, title }: Props) => {
  const [journal, setJournal] = useState<Journal>({
    title: "",
    content: "",
    categoryId: "",
    date: new Date(),
  });
  const theme = useTheme();

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
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24, gap:14 }}>
            <TextInput
              label="Title"
              mode="outlined"
              value={journal?.title || ""}
              onChangeText={(text) => setJournal({ ...journal, title: text })}
            />
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
          <Button onPress={() => onClose()}>Cancel</Button>
          <Button
            style={{
              borderRadius: 5,
            }}
            mode="contained"
            onPress={() => onAction()}
          >
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddJournal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
