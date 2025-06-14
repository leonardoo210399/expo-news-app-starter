import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import { NewsDataType } from "../types/NewsDataType.ts";
import Animated from "react-native-reanimated";
import Colors from "../constants/Colors.ts";

type Props = {
  items: NewsDataType[];
  paginationsIndex: number;
  scrollX: SharedValue<number>;
};

const Paginations = ({ items, paginationsIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationsIndex === index ? "#FF4C4C" : "#666",
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default Paginations;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    width: 8,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
