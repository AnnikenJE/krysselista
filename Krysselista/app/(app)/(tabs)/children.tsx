//
//
// Children page for employees to view all children

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";

export default function ChildrenScreen() {
  return (
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      <View style={style.container}>
        <Text>Alle barn</Text>
      </View>
    </LinearGradient>
  );
}

// Midlertidig
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
