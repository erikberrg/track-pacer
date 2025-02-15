import React, { useState } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useAnimationContext } from "@/components/AnimationContext";
import PacerList from "@/components/PacerList";
import NoPacers from "@/components/NoPacers";
import {
  calculateRepetition,
  calculateDelay,
  calculateDistance,
  calculateDuration,
} from "../../helpers/calculations";
import { theme } from "@/constants/theme";
import uuid from "react-native-uuid";
import * as Haptics from "expo-haptics";

// Screen that contains a list of user presets

export default function ViewPresets() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const router = useRouter();
  const { setAnimationColor, startAnimation } = useAnimationContext();

  // Define the pacers state
  const [pacers, setPacers] = useState([]);

  // Load the presets from async storage with a unique ID
  const loadPresets = async () => {
    try {
      const savedPacers = await AsyncStorage.getItem("userPresets");
      if (savedPacers) {
        const parsedPacers = JSON.parse(savedPacers);
        const pacersWithIds = parsedPacers.map((pacer) => ({
          ...pacer,
          id: pacer.id || uuid.v4(),
        }));

        setPacers(pacersWithIds);
      }
    } catch (error) {
      console.error("Error loading pacers:", error);
    }
  };

  // Load the presets when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadPresets();
    }, [])
  );

  // Function to delete a pacer
  const handleDeletePacer = async (id) => {
    if (!id) {
      console.error("Error: Trying to delete a pacer with an undefined ID");
      return;
    }
    try {
      console.log("Deleted:", id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPacers((prevPacers) => {
        const updatedPacers = prevPacers.filter((pacer) => pacer.id !== id);
        AsyncStorage.setItem(
          "userPresets",
          JSON.stringify(updatedPacers)
        ).catch(console.error);
        return updatedPacers;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to start the animation
  const handleStart = (pacer) => {
    const { impactAsync, ImpactFeedbackStyle } = require("expo-haptics");
    setAnimationColor(pacer.color);
    startAnimation(
      calculateDuration(pacer.minutes, pacer.seconds),
      calculateDistance(pacer.distance),
      calculateRepetition(pacer.repetitions),
      calculateDelay(pacer.delay)
    );
    router.push("/(main)");
    impactAsync(ImpactFeedbackStyle.Medium);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? theme.darkColors.bg
            : theme.lightColors.bg,
        },
      ]}
    >
      {pacers.length > 0 ? (
        <PacerList
          pacers={pacers}
          onStart={handleStart}
          onDelete={handleDeletePacer}
        />
      ) : (
        <NoPacers onAdd={() => router.push("/Modal")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
