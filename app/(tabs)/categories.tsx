import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Card, List, Searchbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Category } from "../types/types";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const fetchCategories = async () => {
    const url = "/api/category";
    const { success, data } = await getData(url, {});

    if (success) {
      setCategories(data.categories);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Categories" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            router.navigate("/categories/add-cat");
          }}
        />
      </Appbar>
      <View style={styles.container}>
        <View style={styles.search}>
          <Searchbar placeholder="Search" onChangeText={() => {}} value="" />
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 4 }}>
              <Card
                style={[
                  styles.card,
                  {
                    backgroundColor: colorScheme === "dark" ? theme.colors.primary : theme.colors.secondary,
                  },
                ]}
              >
                <List.Item left={(props) => <List.Icon {...props} icon="folder" />} title={item.name} />
              </Card>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  search: {
    marginBottom: 20,
  },
  card: {
    elevation: 2,
    borderRadius: 10,
    padding: 10,
  },
});
