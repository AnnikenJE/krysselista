//
//
// Home screen for employees

import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreenEmployee() {
  return (
    <LinearGradient colors={["#FFE5EC", "#E3F2FD"]} style={{ flex: 1 }}>
      <View style={style.container}>
        <Text>Home employee</Text>
        <Text>Hjem ansatt</Text>
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
