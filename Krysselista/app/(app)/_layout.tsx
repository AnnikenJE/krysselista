//
//
// App layout with stack navigator

import { Stack, Redirect } from "expo-router";
import { View, Text} from "react-native";
import { useAuthSession } from "@/providers/authenticationContext";

export default function AppLayout() {

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

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
