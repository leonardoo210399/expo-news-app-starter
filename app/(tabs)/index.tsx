import { StyleSheet, Text, View,ScrollView } from "react-native";
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
import Categories from "../../components/Categories.tsx";
import NewsList from "../../components/NewsList.tsx";
import Loading from "../../components/Loading.tsx";
type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=pub_068bcc6f4c094fa5b15fc42ddd3fca50&q=bitcoin&size=5&language=en`;
      const response = await axios.get(URL);
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

  const getNews = async (category:String = '') => {
    try {

      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }

      const URL = `https://newsdata.io/api/1/latest?apikey=pub_068bcc6f4c094fa5b15fc42ddd3fca50&q=cryptocurrency&size=10&language=en&${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch breaking news:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  const onCatChanged = (category: string) => {
    setNews([]); // Clear previous news
    getNews(category); // Fetch news for the selected category
  }

  return (
    <ScrollView style={(styles.container, { paddingTop: safeTop })}>
      <Header />
      <SearchBar withHorizontalPadding={true}/>
      {isLoading ? (
        <Loading size={'large'}/>
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      <Categories 
        onCategoryChanged={onCatChanged} 
      />
      <NewsList newsList={news}/>
    </ScrollView>
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
