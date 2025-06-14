import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import BreakingNews from "../../components/BreakingNews.tsx";
import { useState } from "react";
import { NewsDataType } from "../../types/NewsDataType.ts";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=pub_b61230c1a46b4df9b5521586eb26f856&q=bitcoin&size=5&language=en`;
      const response = await axios.get(URL);

      console.log(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch breaking news:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };
  return (
    <View style={(styles.container, { paddingTop: safeTop })}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
