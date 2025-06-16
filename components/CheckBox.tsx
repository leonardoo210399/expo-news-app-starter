import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Animated, {
  useAnimatedStyle,
  withTiming,
  FadeInLeft,
  FadeOutLeft,
    LinearTransition,
} from "react-native-reanimated";

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const CheckBox = ({ label, checked, onPress }: Props) => {
  const rnAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? "rgba(239, 142,82,0.1)" : "transparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? "#FF4C4C" : "#333", { duration: 150 }),
      paddingLeft: 16,
      paddingRight: checked ? 10 : 16,
    };
  }, [checked]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? "#FF4C4C" : "#333", { duration: 150 }),
    };
  }, [checked]);

  return (
    <Animated.View style={[styles.container, rnAnimatedContainerStyle]} onTouchEnd={onPress} layout={LinearTransition.springify().mass(0.8)}>
      <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconWrapper}
          entering={FadeInLeft.duration(350)}
          exiting={FadeOutLeft}
          onTouchEnd={onPress}
        >
          <AntDesign name="checkcircle" size={14} color={"#FF4C4C"} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 32,
    // gap: 8,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#FF4C4C",
  },
  iconWrapper: {
    width: 14,
    height: 14,
    // borderRadius: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#FF4C4C',
    marginLeft: 8,
  },
});
