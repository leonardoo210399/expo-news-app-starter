import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NewsDataType } from "../types/NewsDataType.ts";
import { SharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Link } from "expo-router";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            inputRange,
            [-width * 0.15, 0, width * 0.15],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={[styles.itemWrapper, rnStyle]}
          key={slideItem.article_id}
        >
          <Image
            source={{ uri: slideItem.image_url }}
            style={styles.imgStyle}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={styles.background}
          >
            <View style={styles.sourceInfo}>
              {slideItem.source_icon && (
                <Image
                  source={{ uri: slideItem.source_icon }}
                  style={styles.sourceIcon}
                />
              )}
              <Text style={styles.sourceName}>{slideItem.source_name}</Text>
            </View>

            <Text style={styles.title} numberOfLines={2}>
              {slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  sourceName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});
