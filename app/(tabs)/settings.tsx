import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, useLocalSearchParams, Link } from "expo-router";
import Loading from "../../components/Loading.tsx";
import { NewsItem } from "../../components/NewsList.tsx";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>About</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Send Feedback</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Privacy Policy</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Terms of Use</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn,]} onPress={toggleSwitch}>
          <Text style={styles.itemBtnTxt}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginRight:-10}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnTxt, { color: "red" }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color={"red"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 1,
   alignItems: 'center',
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
