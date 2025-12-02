import { AuthSessionProvider } from "@/providers/authenticationContext";
import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}
