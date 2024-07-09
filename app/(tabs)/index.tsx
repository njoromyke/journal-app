import { Image, StyleSheet, Platform, FlatList } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Chip, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { getData } from "@/utils/api";
import { Category } from "../types/types";
import AddJournal from "../../components/add-journal/add-journal";

export default function HomeScreen() {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalMode, setModalMode] = useState<string | null>(null);

  const toggleModal = (mode: string | null) => {
    console.log(mode);
    setModalMode(mode);
  };

  const fetchCategories = async () => {
    const url = "/api/category";
    const { success, data } = await getData(url, {});

    if (success) {
      setCategories(data.categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: theme.colors.primary, dark: theme.colors.primary }}
      headerImage={<Image source={require("@/assets/images/stars.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome!
        </Text>
        <Button mode="contained" onPress={() => toggleModal("add")}>
          Add A Journal
        </Button>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Chip icon="star" style={{ margin: 4 }}>
              {item.name}
            </Chip>
          )}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>Tap the Explore tab to learn more about what's included in this starter app.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      {modalMode === "add" && <AddJournal onAction={() => {}} onClose={() => toggleModal(null)} title="Add Journal" />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
