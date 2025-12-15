//
//
// Default tab index. Redirects to correct home based on user type

import { useAuthSession } from "@/providers/authenticationContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// TODO: Bug where this site shows
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