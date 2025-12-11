//
//
// Children page for employees to view all children

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function ChildrenScreen() {
  return (
    <LinearGradient colors={["#FFE5EC", "#E3F2FD"]} style={{ flex: 1 }}>
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
