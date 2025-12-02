//
//
// Root layout for the app

import { Slot } from "expo-router";
import { AuthSessionProvider } from "@/providers/authenticationContext";
import React from "react";

export default function RootLayout() {
  return <Slot />;
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}