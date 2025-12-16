//
//
// Default tab index. Redirects to correct home based on user type

// Imports --------------------------------------------------------------------------
import { useAuthSession } from "@/providers/authenticationContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// TabIndex --------------------------------------------------------------------------
export default function TabsIndex() {
  const { user, isLoading } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const isEmployee = Boolean(user?.isEmployee);
      if (isEmployee) {
        router.replace("/(app)/(tabs)/homeEmployee");
      } else {
        router.replace("/(app)/(tabs)/homeParent");
      }
    }
  }, [isLoading, user?.isEmployee, router]);

  return null;
}
