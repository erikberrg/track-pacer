import React from "react";
import { Stack } from "expo-router";
import { AnimationProvider } from "../components/AnimationContext";
import { theme } from "../constants/theme";
import { Button, useColorScheme } from "react-native";
import { useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Layout screen to wrap the main app

const _layout = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  return (
    <GestureHandlerRootView>
      <AnimationProvider>
        <Stack>
          {/* Main App */}
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />

          {/* Modal Screen */}
          <Stack.Screen
            name="Modal"
            options={({ route }) => ({
              presentation: "modal",
              title: "New",
              headerShadowVisible: false,
              headerTintColor: isDarkTheme ? theme.darkColors.text : theme.lightColors.text,
              headerStyle: {
                backgroundColor: isDarkTheme
                  ? theme.darkColors.modalBg
                  : theme.lightColors.modalBg,
              },
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <Button
                    title="Cancel"
                    color= {isDarkTheme ? theme.darkColors.text : theme.lightColors.text}
                    onPress={() => navigation.goBack()}
                  />
                );
              },
            })}
          />
        </Stack>
      </AnimationProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
