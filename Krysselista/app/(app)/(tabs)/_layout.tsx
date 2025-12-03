//
//
// Tab layout

import { Tabs } from "expo-router";
import { Feather} from "@expo/vector-icons";
import { Colors } from "@/theme/colors";

export default function TabBar() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
                tabBarActiveTintColor: Colors.primaryPurple,
                tabBarLabelStyle: {
                    fontSize: 16,
                },
                tabBarStyle: {
                    paddingTop: 4
                },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Hjem",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
				}}
			/>
            
			<Tabs.Screen
				name="profile"
				options={{
					title: "Mitt barn",
					tabBarIcon: ({ color }) => (
						<Feather name="user" size={24} color={color} />
					),
				}}
			/>

			{/* TODO: If else isEmployee = true */}
			<Tabs.Screen
				name="children"
				options={{
					title: "Alle barn",
					tabBarIcon: ({ color }) => (
						<Feather name="users" size={24} color={color} />
					),
				}}
			/>

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
