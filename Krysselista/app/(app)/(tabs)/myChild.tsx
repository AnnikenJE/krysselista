//
//
// MyChild page for the users child info

// Imports --------------------------------------------------------------------------
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getChildrenByUserId } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import { useAuthSession } from "@/providers/authenticationContext";
import Feather from "@expo/vector-icons/Feather";

// MyChild --------------------------------------------------------------------------
export default function MyChild() {
  // Variables
  const { user } = useAuthSession();
  const [children, setChildren] = useState<ChildData[]>([]);

  // Functions
  async function getChildrenFromApi() {
    if (!user?.id) return;
    const result = await getChildrenByUserId(user.id);
    setChildren(result ?? []);
  }

  // Effect called when entering the screen
  useFocusEffect(() => {
    getChildrenFromApi();
  });

  // Return --------------------------------------------------------------------------
  return (
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <View style={styles.container}>
          {children.length === 0 ? (
            <Text>Du har ingen registrerte barn.</Text>
          ) : (
            <>
              {children.map((child) => (
                <View key={child.id} style={styles.childSection}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarLetter}>{child.name[0]}</Text>
                  </View>

                  <Text style={styles.childName}>{child.name}</Text>

                  <View
                    style={[
                      styles.checkStatus,
                      child.isPresent ? styles.checkedIn : styles.checkedOut,
                    ]}
                  >
                    <Text style={styles.checkStatusText}>
                      {child.isPresent ? "Til stede" : "Ikke til stede"}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.parentContainer}>
                <Text style={styles.parentTitle}>Foresatte</Text>

                <View style={styles.parentDetailContainer}>
                  <Text style={styles.parentName}>{user?.name}</Text>

                  <View
                    style={styles.contactDetails}
                  >
                    <Feather name="phone" size={20} color="black" />
                    <Text style={[styles.parentDetail, { marginLeft: 6 }]}>
                      {user?.phone}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="mail" size={20} color="black" />
                    <Text style={[styles.parentDetail, { marginLeft: 6 }]}>
                      {user?.email}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Styles --------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },

  childSection: {
    width: "100%",
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 48,
    backgroundColor: Colors.primaryPurple,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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
    fontSize: FontSizes.H2,
    marginBottom: 8,
    color: Colors.primaryBlack,
  },

  checkStatus: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 25,
  },

  checkedIn: {
    backgroundColor: "#47A74B",
  },

  checkedOut: {
    backgroundColor: "#E27373",
  },

  checkStatusText: {
    fontSize: FontSizes.H4,
    color: Colors.primaryWhite,
  },

  parentContainer: {
    width: "85%",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  parentTitle: {
    fontSize: FontSizes.H3,
    marginBottom: 10,
    color: Colors.primaryBlack,
  },

  parentDetailContainer: {
    backgroundColor: Colors.variationWhite,
    padding: 15,
    borderRadius: 15,
  },

  parentName: {
    fontSize: FontSizes.H3,
    marginBottom: 10,
    paddingBottom: 5,
  },

  parentDetail: {
    fontSize: FontSizes.H4,
    color: Colors.darkGray,
    marginBottom: 5,
  },
  contactDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
