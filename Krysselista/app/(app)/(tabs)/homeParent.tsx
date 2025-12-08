//
//
// Home screen for parents

import { StyleSheet, Text, View } from "react-native";

export default function HomeScreenParent() {
  return (
    <View style={style.container}>
      <Text>Hjem foresatt</Text>
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
});
