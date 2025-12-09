//
//
// Settings page

import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuthSession } from "@/providers/authenticationContext";

export default function SettingsScreen() {
  const { signOut } = useAuthSession();
  return (
    <View style={style.container}>
      <Text>Innstillinger</Text>
      <Pressable onPress={signOut}>
        <Text>Logg ut</Text>
      </Pressable>
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
