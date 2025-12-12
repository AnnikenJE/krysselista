//
//
// Root layout for the app

// Imports --------------------------------------------------------------------------
import { Slot } from "expo-router";
import { AuthSessionProvider } from "@/providers/authenticationContext";

// RootLayout --------------------------------------------------------------------------
export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}
