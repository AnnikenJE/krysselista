//
//
// Children page for employees to view all children

import { StyleSheet, Text, View } from "react-native";

export default function ChildrenScreen() {
	return (
		<View style={style.container}>
			<Text>Alle barn</Text>
		</View>
	);
}

// Midlertidig
const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
