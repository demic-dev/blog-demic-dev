import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing,
} from "react-native-reanimated";

const App = () => {
  const progress = useSharedValue(0);

  const animatedBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["blue", "orange"]
    );

    return {
      backgroundColor,
    };
  });

  const handlePress = () => {
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.exp,
    });
  };

  return (
    <Animated.View style={[style.container, animatedBackground]}>
      <Text style={style.text}>Hello everyone! 👋🏼</Text>
      <TouchableOpacity style={style.buttonContainer} onPress={handlePress}>
        <Text style={style.buttonText}>Click me</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  buttonContainer: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    letterSpacing: 1,
    fontWeight: "bold",
  },
});

export default App;
