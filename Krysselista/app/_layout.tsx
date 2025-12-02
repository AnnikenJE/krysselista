//
//
// Root layout for the app

import { Slot } from "expo-router";
import { AuthSessionProvider } from "@/providers/authenticationContext";

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}