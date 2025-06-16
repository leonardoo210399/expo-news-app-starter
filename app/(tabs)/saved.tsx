import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, useLocalSearchParams ,Link} from "expo-router";
import Loading from "../../components/Loading.tsx";
import { NewsItem } from "../../components/NewsList.tsx";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native"


type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);
  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true);
      if (res) {
        console.log("Bookmark res: ", res);
        let query_string = res.join(",");
        console.log("query_string: ", query_string);

        const response = await axios.get(
          `https://newsdata.io/api/1/latest?apikey=pub_068bcc6f4c094fa5b15fc42ddd3fca50&id=${query_string}`
        );
        setBookmarkNews(response.data.results);
        setIsLoading(false);
      } else {
        setBookmarkNews([]);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={bookmarkNews}
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

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
