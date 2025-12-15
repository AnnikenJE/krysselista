//
//
// Children page for employees to view all children

// Imports --------------------------------------------------------------------------
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { getAllChildrenById } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { FontSizes } from "@/theme/fontSize";

// ChidrenScreen --------------------------------------------------------------------------
export default function ChildrenScreen() {
  // Variables
  const [children, setChildren] = useState<ChildData[]>([]);

  // UseEffects
  useEffect(() => {
    getChildrenFromApi();
  }, []);

  // Functions  --------------------------------------------------------------------------
  async function getChildrenFromApi() {
    const childResult = await getAllChildrenById();
    setChildren(childResult ?? []);
  }

  // Return --------------------------------------------------------------------------
  return (
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      <Text style={styles.titleText}>Alle barn</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {children.map((child) => (
          <View key={child.id} style={styles.childContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{child.name[0]}</Text>
            </View>

            <Text style={styles.childName}>{child.name}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

// Styles --------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: FontSizes.H2,
    color: Colors.primaryBlack,
    paddingLeft: 30,
    paddingTop: 80,
  },
  childContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primaryWhite,
    width: "90%",
    padding: 12,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: Colors.primaryPurple,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    borderColor: Colors.primaryWhite,
    borderWidth: 3,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  avatarLetter: {
    color: Colors.primaryWhite,
    fontSize: FontSizes.H1,
  },

  childName: {
    fontSize: FontSizes.H3,
  },
});
