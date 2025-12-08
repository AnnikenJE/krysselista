//
//
// Home screen for employees

import { StyleSheet, Text, View } from "react-native";

export default function HomeScreenEmployee() {
  return (
    <View style={style.container}>
      <Text>Home employee</Text>
      <Text>Hjem ansatt</Text>
    </View>
  );
}

// Midlertidig
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})