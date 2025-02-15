import React from "react";
import { Animated, StyleSheet, View, useColorScheme } from "react-native";
import LottieView from "lottie-react-native";
import { useAnimationContext } from "./AnimationContext";
import { wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const TrackView = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const { animationColor, animationProgress } = useAnimationContext();
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/images/track2.json")}
        progress={animationProgress.current}
        colorFilters={[
          {
            keypath: "Marker",
            color: animationColor,
          },
          {
            keypath: "Track",
            color: isDarkTheme ? theme.darkColors.track : theme.lightColors.track,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginBottom: wp(12),
  },
});

export default TrackView;
