import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";
import { NewsDataType } from "../../types/NewsDataType";
import {
  useLocalSearchParams,
  Stack,
  router,
  Link,
  useSearchParams,
} from "expo-router";
import Loading from "../../components/Loading.tsx";
import { useEffect } from "react";
import { NewsItem } from "../../components/NewsList.tsx";

type Props = {};

const search = (props: Props) => {
  useEffect(() => {
    getNews();
  }, []);

  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNews = async () => {
    try {
      let categoryString = "";
      let countryString = "";
      let queryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }

      const URL = `https://newsdata.io/api/1/latest?apikey=pub_068bcc6f4c094fa5b15fc42ddd3fca50&size=10&language=en${categoryString}${countryString}${queryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        console.log(URL);

        setIsLoading(false);
      } else {
        console.error("Failed to fetch breaking news:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          //   headerRight: () => (
          //     <TouchableOpacity onPress={() => {}}>
          //       <Ionicons name="heart-outline" size={22} />
          //     </TouchableOpacity>
          //   ),
          title: "Search",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => (
              <Link key={index} href={`/news/${item.article_id}`} asChild>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
