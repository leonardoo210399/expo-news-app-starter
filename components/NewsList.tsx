import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Loading from "./Loading.tsx";
import { Link } from "expo-router";
import { NewsDataType } from "../types/NewsDataType.ts";


type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length == 0 ? (
        <Loading size={"large"} />
      ) : (
        newsList.map((item, index) => (
          <Link key={index} href={`/news/${item.article_id}`} asChild>
            <TouchableOpacity>
              <NewsItem item={item} />
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export default NewsList;

export const NewsItem =({item}:{item:NewsDataType})=>{
  return(
          <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.itemImg}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <View style={styles.itemSourceInfo}>
                    <Image
                      source={{ uri: item.source_icon }}
                      style={styles.itemSourceImg}
                    />
                    <Text style={styles.itemSourceName}>
                      {item.source_name}
                    </Text>
                  </View>
                </View>
              </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  itemSourceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: "#666",
  },
});
