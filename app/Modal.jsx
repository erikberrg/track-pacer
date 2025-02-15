import React, { useState, useLayoutEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Button,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { theme } from "../constants/theme";

import { NameInput } from "../components/form/NameInput";
import { ColorSelector } from "../components/form/ColorSelector";
import { DistancePicker } from "../components/form/DistancePicker";
import { TimePicker } from "../components/form/TimePicker";
import { RepetitionsInput } from "../components/form/RepetitionsInput";
import { IntervalDelayPicker } from "../components/form/IntervalDelayPicker";
import Animated, { LinearTransition } from "react-native-reanimated";

// Modal screen that allows users to create a new pacer

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const dividerColor = isDarkTheme
    ? theme.darkColors.divider
    : theme.lightColors.divider;
  const navigation = useNavigation();

  // Define the pacer data state
  const [pacerData, setPacerData] = useState({
    name: "",
    color: "",
    distance: 200,
    minutes: 0,
    seconds: 30,
    repetitions: 1,
    delay: 0,
  });

  // Function to handle exporting form data
  const handleExportData = async () => {
    try {
      const pacers = await AsyncStorage.getItem("userPresets");
      const pacerList = pacers ? JSON.parse(pacers) : [];
      pacerList.push(pacerData);
      await AsyncStorage.setItem("userPresets", JSON.stringify(pacerList));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Update the header options to add a button to add the pacer
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          color={isDarkTheme ? theme.darkColors.text : theme.lightColors.text}
          onPress={handleExportData}
        />
      ),
    });
  }, [navigation, pacerData, isDarkTheme]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? theme.darkColors.modalBg
            : theme.lightColors.modalBg,
        },
      ]}
    >
      {/* Name Input */}
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.section,
          {
            backgroundColor: isDarkTheme
              ? theme.darkColors.section
              : theme.lightColors.bg,
          },
        ]}
      >
        <NameInput
          value={pacerData.name}
          onChange={(name) => setPacerData((prev) => ({ ...prev, name }))}
        />

        <Animated.View
          layout={LinearTransition}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              borderBottomColor: dividerColor,
              borderBottomWidth: 0.3,
            }}
          />
        </Animated.View>

        {/* Color Selector */}
        <ColorSelector
          selectedColor={pacerData.color}
          onSelectColor={(color) =>
            setPacerData((prev) => ({ ...prev, color }))
          }
        />
      </Animated.View>

      <Animated.View
        layout={LinearTransition}
        style={[
          styles.section,
          {
            backgroundColor: isDarkTheme
              ? theme.darkColors.section
              : theme.lightColors.bg,
          },
        ]}
      >
        {/* Distance Picker */}
        <DistancePicker
          selectedDistance={pacerData.distance}
          onSelectDistance={(distance) =>
            setPacerData((prev) => ({ ...prev, distance }))
          }
        />

        <Animated.View
          layout={LinearTransition}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              borderBottomColor: dividerColor,
              borderBottomWidth: 0.3,
            }}
          />
        </Animated.View>

        {/* Time Picker */}
        <TimePicker
          minutes={pacerData.minutes}
          seconds={pacerData.seconds}
          onChangeTime={(minutes, seconds) =>
            setPacerData((prev) => ({ ...prev, minutes, seconds }))
          }
        />
      </Animated.View>

      <Animated.View
        layout={LinearTransition}
        style={[
          styles.section,
          {
            backgroundColor: isDarkTheme
              ? theme.darkColors.section
              : theme.lightColors.bg,
          },
        ]}
      >
        {/* Repetitions */}
        <RepetitionsInput
          repetitions={pacerData.repetitions}
          onChangeRepetitions={(repetitions) =>
            setPacerData((prev) => ({ ...prev, repetitions }))
          }
        />

        <Animated.View
          layout={LinearTransition}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              borderBottomColor: dividerColor,
              borderBottomWidth: 0.3,
            }}
          />
        </Animated.View>

        {/* Interval Picker */}
        <IntervalDelayPicker
          delay={pacerData.delay}
          onChangeDelay={(delay) =>
            setPacerData((prev) => ({ ...prev, delay }))
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 10 : 0,
    backgroundColor: theme.colors.offWhite,
    gap: 10,
  },
  section: {
    width: "90%",
    backgroundColor: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
