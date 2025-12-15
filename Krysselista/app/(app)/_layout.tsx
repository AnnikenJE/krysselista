//
//
// App layout with stack navigator

// Imports --------------------------------------------------------------------------
import { Stack, Redirect } from "expo-router";
import { View, Text } from "react-native";
import { useAuthSession } from "@/providers/authenticationContext";

// AppLayout --------------------------------------------------------------------------
export default function AppLayout() {
  // Variables
  const { user, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <View>
        <Text>Henter bruker...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href={"/authentication"} />;
  }

  // Return --------------------------------------------------------------------------
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
