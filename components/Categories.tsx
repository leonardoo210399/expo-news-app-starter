import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import newsCategoryList from "../constants/Categories";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Animated from "react-native-reanimated";

type Props = {
  onCategoryChanged?: (category: string) => void;
};

const Categories = ({onCategoryChanged}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
  const selected = itemRef.current[index];
  setActiveIndex(index);

  selected?.measure((x, y, width, height, pageX, pageY) => {
    // Offset to move item to the start of the scroll view
    scrollRef.current?.scrollTo({ x: pageX-20, y: 0, animated: true });
  });
  
  onCategoryChanged?.(newsCategoryList[index].slug);
};

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        {newsCategoryList.map((item, index) => (
         <TouchableOpacity
  ref={(element) => (itemRef.current[index] = element)}
  key={index}
  style={[styles.item, activeIndex === index && styles.itemActive]}
  onPress={() => handleSelectCategory(index)}
>
  <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>
    {item.title}
  </Text>
</TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    gap: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#666",
    letterSpacing: 0.5,
  },
  itemActive: {
    backgroundColor: "#FF4C4C",
    borderColor: "#FF4C4C",
  },
  itemTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
