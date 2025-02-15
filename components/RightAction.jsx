import React from "react";
import { Pressable, Text, View } from "react-native";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import Icon from "@/assets/icons";

export default function RightAction({ dragX, id, onDelete }) {

  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value + 70 }],
    height: "100%",
    width: 70,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: "#fff",
  }));

  return (
    <Pressable onPress={() => onDelete(id)}>
      <Reanimated.View style={styleAnimation}>
        <Icon name="delete" size={18} color="#fff" />
        <Text style={styles.deleteText}>Delete</Text>
      </Reanimated.View>
    </Pressable>
  );
}

const styles = {
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
};
