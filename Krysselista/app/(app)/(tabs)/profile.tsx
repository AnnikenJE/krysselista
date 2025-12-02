//
//
// Profile page for the user

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuthSession } from "@/providers/authenticationContext";

export default function ProfileScreen() {
  const { signOut } = useAuthSession();

  return (
    <View style={style.container}>
      <Text> profile</Text>
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
