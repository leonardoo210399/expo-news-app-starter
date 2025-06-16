import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar.tsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import newsCategoryList from "../../constants/Categories.ts";
import CheckBox from "../../components/CheckBox.tsx";
import { useNewsCategories } from "../../hooks/useNewsCategories.ts";
import { useNewsCountries } from "../../hooks/useNewsCountry.ts";
import { Link } from "expo-router";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <SearchBar
        withHorizontalPadding={false}
        setSearchQuery={setSearchQuery}
      />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected} // This should be managed by state if needed
            onPress={() => {
              toggleNewsCategory(item.id); // Toggle selection
              setCategory(item.slug); // Set category state
            }} // Handle selection
          />
        ))}
      </View>

      <Text style={styles.title}>Countries </Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected} // This should be managed by state if needed
            onPress={() => {
              toggleNewsCountry(index); // Toggle selection
              setCountry(item.code); // Set country state
            }} // Handle selection
          />
        ))}
      </View>

      <Link
        href={{
          pathname: "/news/search",
          params: {
            query: searchQuery,
            category,
            country,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: "#FF4C4C",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchBtnTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
