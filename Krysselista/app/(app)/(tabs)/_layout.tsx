//
//
// Tab layout

import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";
import { useAuthSession } from "@/providers/authenticationContext";

export default function TabBar() {
	const { user } = useAuthSession();
	const isEmployee = Boolean(user?.isEmployee);

	return (
		<Tabs
			// Tab bar styling
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.variationPurple,
				tabBarLabelStyle: {
					fontSize: 16,
				},
				tabBarStyle: {
					paddingTop: 4,
				},
			}}
		>
			{/* Index tab is supposed to be hidden. */}
			<Tabs.Screen
				name="index"
				options={{
					href: null,
				}}
			/>

			{/* Home tabs */}
			<Tabs.Screen
				name="homeEmployee"
				options={{
					title: "Hjem",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
					href: isEmployee ? undefined : null,
				}}
			/>

			<Tabs.Screen
				name="homeParent"
				options={{
					title: "Hjem",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
					href: !isEmployee ? undefined : null,
				}}
			/>

			{/* Profile tabs */}
			<Tabs.Screen
				name="myChild"
				options={{
					title: "Mitt barn",
					tabBarIcon: ({ color }) => (
						<Feather name="user" size={24} color={color} />
					),
					href: !isEmployee ? undefined : null,
				}}
			/>

			{/* All children tab for employees */}

			<Tabs.Screen
				name="children"
				options={{
					title: "Alle barn",
					tabBarIcon: ({ color }) => (
						<Feather name="users" size={24} color={color} />
					),
					href: isEmployee ? undefined : null,
				}}
			/>

			{/* Settings tab */}
			<Tabs.Screen
				name="settings"
				options={{
					title: "Innstillinger",
					tabBarIcon: ({ color }) => (
						<Feather name="settings" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
