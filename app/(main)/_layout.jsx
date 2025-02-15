import { Tabs, useNavigation } from "expo-router";
import { View, Platform, Pressable, useColorScheme } from "react-native";
import React from "react";
import { wp } from "@/helpers/common";
import Icon from "../..//assets/icons";
import { theme } from "../../constants/theme";

// Tab layout screen to navigate between home, add, and presets

const _layout = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDarkTheme ? theme.darkColors.bg : theme.lightColors.bg,
        },
        headerTintColor: isDarkTheme ? theme.darkColors.text : theme.lightColors.text,
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: isDarkTheme ? theme.darkColors.text : theme.lightColors.text,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 90,
          paddingTop: wp(4),
          backgroundColor: isDarkTheme ? theme.darkColors.bg : theme.lightColors.bg,
        }
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "View Track",
          tabBarIcon: ({ focused, color }) => focused ? <Icon name="home" color={color} strokeWidth={0.5} fill={color} height={28} width={28} /> : <Icon name="home" color={color} strokeWidth={2.5} fill="none" height={28} width={28} />
        }}
      />

      {/* Add */}
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 50,
                width: 60,
                backgroundColor: isDarkTheme ? theme.darkColors.tabButton : theme.lightColors.tabButton,
                borderRadius: 16,
                borderCurve: "continuous",
              }}
            >
              <Pressable
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPressIn={() => {
                  if (Platform.OS === "ios" || Platform.OS === "android") {
                    const {
                      impactAsync,
                      ImpactFeedbackStyle,
                    } = require("expo-haptics");
                    impactAsync(ImpactFeedbackStyle.Light);
                  }
                }}
                onPressOut={() => {
                  if (Platform.OS === "ios" || Platform.OS === "android") {
                    const {
                      impactAsync,
                      ImpactFeedbackStyle,
                    } = require("expo-haptics");
                    impactAsync(ImpactFeedbackStyle.Heavy);
                  }
                  navigation.navigate("Modal");
                }}
              >
                <Icon name="plus" color={color} strokeWidth={2.5} />
              </Pressable>
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
      />

      {/* Presets */}
      <Tabs.Screen
        name="presets"
        options={{
          title: "View Presets",
          tabBarIcon: ({ color }) => (
            <Icon
              name="list"
              color={color}
              strokeWidth={2.5}
              height={28}
              width={28}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;