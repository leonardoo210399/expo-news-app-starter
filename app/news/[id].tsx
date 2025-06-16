import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { NewsDataType } from "../../types/NewsDataType";
import { useEffect } from "react";
import Loading from "../../components/Loading.tsx";
import { Link } from "expo-router";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: String }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(news[0].article_id);
    }
  }, [isLoading]);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=pub_068bcc6f4c094fa5b15fc42ddd3fca50&id=${id}`;
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

  const saveBookmark = async (newsId: string) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value: string) => value === newsId);
        if (data == null) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("Bookmark added successfully!");
        }
      } else {
        let bookmark = [];
        bookmark.push(newsId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("Bookmark added successfully!");
      }
    });
  };

  const removeBookmark = async (newsId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((value: string) => value !== newsId);
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("Bookmark removed successfully!");
  };

  const renderBookmark = async (newsId: string) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res != null) {
        let data = res.find((value: string) => value === newsId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }
    });
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookmark
                  ? removeBookmark(news[0].article_id)
                  : saveBookmark(news[0].article_id)
              }
            >
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={22}
                color={bookmark ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
              {Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInfo}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
          {!news[0].content ? (
            <Text style={styles.newsContent}>{news[0].content}</Text>
          ) : (
            <Text style={styles.newsContent}>
              {news[0].description || "No content available."}
            </Text>
          )}
          <Link href={news[0].link}>{news[0].link}</Link>
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 30,
  },
  newsImg: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: "#666",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
    letterSpacing: 0.6,
    textTransform: "capitalize",
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    letterSpacing: 0.8,
  },
});
