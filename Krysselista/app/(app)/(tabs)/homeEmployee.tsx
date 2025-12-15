//
//
// Home screen for employees

// Imports --------------------------------------------------------------------------
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { useState, useEffect } from "react";
import { getAllChildrenById } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { FontSizes } from "@/theme/fontSize";

// HomeScreenEmployee --------------------------------------------------------------------------
export default function HomeScreenEmployee() {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      const childrenData = await getAllChildrenById();
      setChildren(childrenData || []);
      setLoading(false);
    };

    fetchChildren();
  }, []);

  const getStatusColor = (isPresent: boolean) => {
    return isPresent ? Colors.statusDarkGreen : Colors.statusDarkRed;
  };

  const getStatusText = (isPresent: boolean) => {
    return isPresent ? "Til stede" : "Ikke til stede";
  };
  // Return --------------------------------------------------------------------------
  return (
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      <ScrollView style={style.container}>
        {loading ? (
          <Text style={style.loadingText}>Laster barn...</Text>
        ) : children.length === 0 ? (
          <Text style={style.emptyText}>Ingen barn registrert</Text>
        ) : (
          children.map((child) => (
            <View key={child.id} style={style.cardContainer}>
              <Pressable style={style.profileCard}>
                <View
                  style={[
                    style.avatar,
                    {
                      borderColor: getStatusColor(child.isPresent),
                    },
                  ]}
                >
                  <Text style={style.avatarText}>
                    {child.name?.charAt(0).toUpperCase() || "?"}
                  </Text>
                </View>
                <View style={style.profileInfo}>
                  <Text
                    style={style.profileName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {child.name}
                  </Text>
                  <Text
                    style={[
                      style.profileStatus,
                      {
                        color: getStatusColor(child.isPresent),
                      },
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {getStatusText(child.isPresent)}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

// Styles --------------------------------------------------------------------------
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: FontSizes.H3,
    color: Colors.primaryBlack,
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: FontSizes.H3,
    color: Colors.darkGray,
    textAlign: "center",
    marginTop: 20,
  },

  // Card styles
  cardContainer: {
    backgroundColor: Colors.variationWhite,
    borderRadius: 20,
    marginBottom: 16,
    marginHorizontal: "7.5%",
    width: "85%",
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryPurple,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.statusDarkGreen,
    borderWidth: 5,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: FontSizes.H2,
    fontWeight: "400",
    color: Colors.lightGray,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },
  profileName: {
    fontSize: FontSizes.H2,
    fontWeight: "400",
    color: Colors.primaryBlack,
    lineHeight: 24,
  },
  profileStatus: {
    fontSize: FontSizes.H3,
    lineHeight: 16,
    fontWeight: "600",
  },
});