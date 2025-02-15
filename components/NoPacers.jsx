import React from "react";
import { Text, View, useColorScheme } from "react-native";
import Button from "@/components/ui/Button";
import { wp } from "@/helpers/common";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";


export default function NoPacers({ onAdd }) {
    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === "dark";
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: wp(4) }}> 
        <Text style={[{ fontSize: 25, fontWeight: "bold" },
          isDarkTheme ? { color: theme.darkColors.text } : { color: theme.lightColors.text }
        ]}>
          No pacers here - yet.
        </Text>
        <Button
          title="Add a Pacer"
          onPress={onAdd}
        />
      </View>
    </ScreenWrapper>
  );
}
