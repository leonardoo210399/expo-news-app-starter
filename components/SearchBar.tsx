import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

type Props = {
  withHorizontalPadding?: boolean;
  setSearchQuery: Function;
};

const SearchBar = ({withHorizontalPadding,setSearchQuery}: Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && { marginHorizontal: 20 } ]}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchTxt}
          autoCapitalize="none"
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#e4e4e4",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    color: Colors.darkGrey,
    flex: 1,
  },
});
