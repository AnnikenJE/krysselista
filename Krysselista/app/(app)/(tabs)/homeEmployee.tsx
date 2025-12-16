//
//
// Home screen for employees

// Imports --------------------------------------------------------------------------
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Colors } from "@/theme/colors";
import { useState, useEffect } from "react";
import { getAllChildrenById } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { FontSizes } from "@/theme/fontSize";

// HomeScreenEmployee --------------------------------------------------------------------------
export default function HomeScreenEmployee() {
	const [children, setChildren] = useState<ChildData[]>([]);
	const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent">("all");


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

	const filteredChildren = children.filter((child) => {
		if (filterStatus === "all") return true;
		if (filterStatus === "present") return child.isPresent === true;
		if (filterStatus === "absent") return child.isPresent === false;
		return true;
	});

	// Return --------------------------------------------------------------------------
	return (
		<LinearGradient
			colors={[Colors.backgroundPink, Colors.backgroundBlue]}
			style={{ flex: 1 }}
		>
			<ScrollView style={style.container}>
       {/* Header */}
        <Text style={style.header}>Status for alle barn</Text>

        {/* Filter buttons */}
        <View style={style.filterContainer}>
          <Pressable
            style={[
              style.filterButton,
              filterStatus === "all" && style.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("all")}
          >
            <Text
              style={[
                style.filterButtonText,
                filterStatus === "all" && style.filterButtonTextActive,
              ]}
            >
              Alle
            </Text>
          </Pressable>

          <Pressable
            style={[
              style.filterButton,
              filterStatus === "present" && style.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("present")}
          >
            <Text
              style={[
                style.filterButtonText,
                filterStatus === "present" && style.filterButtonTextActive,
              ]}
            >
              Til stede
            </Text>
          </Pressable>

          <Pressable
            style={[
              style.filterButton,
              filterStatus === "absent" && style.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("absent")}
          >
            <Text
              style={[
                style.filterButtonText,
                filterStatus === "absent" && style.filterButtonTextActive,
              ]}
            >
              Ikke til stede
            </Text>
          </Pressable>
        </View>

        {/* Children list */}
        {loading ? (
          <Text style={style.loadingText}>Laster barn...</Text>
        ) : filteredChildren.length === 0 ? (
          <Text style={style.emptyText}>Ingen barn registrert</Text>
        ) : (
          filteredChildren.map((child) => (
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
    paddingTop: 40,
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

  // Header + filter 
   header: {
    fontSize: FontSizes.H1,
    fontWeight: "600",
    color: Colors.primaryBlack,
    textAlign: "center",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.variationWhite,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  filterButtonActive: {
    backgroundColor: Colors.variationPurple,
    borderColor: Colors.variationPurple,
  },
  filterButtonText: {
    fontSize: FontSizes.H4,
    fontWeight: "500",
    color: Colors.primaryBlack,
  },
  filterButtonTextActive: {
    color: Colors.primaryWhite,
    fontWeight: "600",
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
