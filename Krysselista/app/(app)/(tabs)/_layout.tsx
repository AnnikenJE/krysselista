//
//
// Tab layout

import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabBar() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Hjem",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="home" size={18} color={color} />
					),
				}}
			/>
            
			<Tabs.Screen
				name="profile"
				options={{
					title: "Mitt barn",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="user" size={18} color={color} />
					),
				}}
			/>

			{/* TODO: If else isEmployee = true */}
			<Tabs.Screen
				name="children"
				options={{
					title: "Alle barn",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="users" size={18} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "Innstillinger",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="gear" size={18} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
