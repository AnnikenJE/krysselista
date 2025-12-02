import { Tabs } from "expo-router";

export default function TabBar() {
    <Tabs
        screenOptions={{
            title: "hjem",
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Hjem",
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Mitt barn",
            }}
        />
    </Tabs>
}