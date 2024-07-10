import { FlatList, Image, Platform, StyleSheet, View } from "react-native";

import Loader from "@/components/loader/loader";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { getData } from "@/utils/api";
import { formatDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Chip, IconButton, Searchbar, Text, useTheme } from "react-native-paper";
import AddJournal from "../../components/add-journal/add-journal";
import { Category, Journal, RepParams } from "../types/types";
import FiltersModal from "@/components/filters-modal/filters-modal";

export default function HomeScreen() {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalMode, setModalMode] = useState<string | null>(null);
  const [reqParams, setReqParams] = useState<RepParams>({
    date: "",
    filterText: "",
    categoryId: "",
  });
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [showSheet, setShowSheet] = useState<boolean>(false);

  const toggleSheet = () => setShowSheet(!showSheet);

  const toggleModal = (mode: string | null) => {
    console.log(mode);
    setModalMode(mode);
  };

  const handleOpenBottomSheet = () => {
    toggleSheet();
  };

  const fetchCategories = async () => {
    const url = "/api/category";
    const { success, data } = await getData(url, {});

    if (success) {
      setCategories(data.categories);
    }
  };

  const fetchJournals = async () => {
    setLoading(true);
    const url = "/api/journals";
    const { success, data } = await getData(url, reqParams);

    if (success) {
      setJournals(data.journals);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [reqParams, refresh]);

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
        <View style={styles.view}>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => setReqParams({ ...reqParams, filterText: text })}
            value={reqParams.filterText}
            style={{ flex: 1 }}
          />
          <IconButton
            icon="filter"
            iconColor={theme.colors.primary}
            onPress={() => {
              handleOpenBottomSheet();
            }}
          />
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {loading && <Loader />}

        {journals.map((item) => (
          <View style={styles.cards} key={item.id}>
            <Card
              style={{
                padding: 8,
                backgroundColor: theme.colors.secondary,
                width: Platform.OS === "web" ? 300 : "100%",
              }}
            >
              <Card.Title title={item.title} />
              <Card.Content>
                <Text>{item.content}</Text>

                <View style={styles.view}>
                  <Chip icon="star" style={{ margin: 4 }}>
                    {item?.category?.name}
                  </Chip>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: 12,
                    }}
                  >
                    {formatDate(item.date)}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon="pencil"
                  onPress={() => {
                    toggleModal("edit");
                    setSelectedJournal(item);
                  }}
                />
              </Card.Actions>
            </Card>
          </View>
        ))}
      </ThemedView>
      {(modalMode === "add" || modalMode === "edit") && (
        <AddJournal
          setRefresh={setRefresh}
          refresh={refresh}
          categories={categories}
          onClose={() => {
            toggleModal(null);
            setSelectedJournal(null);
          }}
          title="Add Journal"
          selectedJournal={selectedJournal}
          mode={modalMode}
        />
      )}

      {showSheet && (
        <FiltersModal categories={categories} reqParams={reqParams} onClose={toggleSheet} setReqParams={setReqParams} />
      )}
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
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  cards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
  },
});
