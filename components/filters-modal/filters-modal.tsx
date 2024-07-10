import { FlatList, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Chip,
  Dialog,
  IconButton,
  Modal,
  Portal,
  Searchbar,
  Text,
  Title,
  ToggleButton,
  useTheme,
} from "react-native-paper";
import { Category, RepParams } from "@/app/types/types";
import { Picker } from "@react-native-picker/picker";

type Props = {
  onClose: () => void;
  reqParams: RepParams;
  categories: Category[];
  setReqParams: Dispatch<SetStateAction<RepParams>>;
};

const dateFilters = ["today", "this_week", "this_month"];

const FiltersModal = ({ reqParams, onClose, categories, setReqParams }: Props) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Portal theme={theme}>
      <Modal
        style={{
          borderRadius: 20,
          padding: 16,
          margin: 16,
          backgroundColor: colorScheme === "dark" ? theme.colors.background : theme.colors.surface,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "50%",
        }}
        visible
        onDismiss={onClose}
      >
        <View style={styles.container}>
          <View style={styles.view}>
            <Text variant="titleMedium">Filters</Text>
            <Text
              style={{
                marginTop: 20,
              }}
              variant="titleMedium"
            >
              Date Filter
            </Text>

            <View style={styles.toggle}>
              {dateFilters.map((item, index) => (
                <Chip
                  key={index}
                  selected={reqParams.date === item}
                  onPress={() => {
                    setReqParams((prev) => ({ ...prev, date: item }));
                  }}
                >
                  {item}
                </Chip>
              ))}
            </View>
          </View>

          <View style={styles.view}>
            <Text>Filter Text</Text>
            <Searchbar
              value={reqParams.filterText}
              onChangeText={(text) => {
                setReqParams((prev) => ({ ...prev, filterText: text }));
              }}
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}
            />
          </View>
          
          <View style={styles.view}>
            <Text>Reset</Text>
            <IconButton
              icon="refresh"
              size={20}
              onPress={() => {
                setReqParams({ date: "today", filterText: "", categoryId: "" });
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", gap: 30, marginTop: 20 },
  view: { marginTop: 4, marginBottom: 8, display: "flex", gap: 3 },
  toggle: { display: "flex", flexDirection: "row", gap: 10 },
});
