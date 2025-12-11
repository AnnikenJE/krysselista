//
// MyChild page for the users child info
//

import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getChildBId, getChildrenByUserId } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import { useAuthSession } from "@/providers/authenticationContext";
import Feather from "@expo/vector-icons/Feather";

export default function MyChild() {
  const { user } = useAuthSession();
  const [children, setChildren] = useState<ChildData[]>([]);

  //gather children from API if any
  async function getChildrenFromApi() {
    if (!user?.id) return;

    //gets all the children connected to users ID and updates state with the available children
    const result = await getChildrenByUserId(user.id);
    setChildren(result ?? []);
  }

  // WHen user goes to this screen, load/update children data
  useFocusEffect(() => {
    getChildrenFromApi();
  });

  return (
    <LinearGradient colors={["#FFE5EC", "#E3F2FD"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
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
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
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
    width: 60,
    height: 60,
    borderRadius: 28,
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
    paddingVertical: 6,
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
    color: Colors.primaryBlack,
  },

  parentContainer: {
    width: "85%",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 16,
    padding: 20,
  },

  parentTitle: {
    fontSize: FontSizes.H3,
    marginBottom: 10,
    color: Colors.primaryBlack,
  },

  parentDetailContainer: {
    backgroundColor: Colors.variationWhite,
    padding: 16,
    borderRadius: 14,
  },

  parentName: {
    fontSize: FontSizes.H3,
    marginBottom: 4,
  },

  parentDetail: {
    fontSize: FontSizes.H4,
    color: Colors.darkGray,
    marginBottom: 4,
  },
});
