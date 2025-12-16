//
//
// Children page for employees to view all children

// Imports --------------------------------------------------------------------------
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { getAllChildrenById } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { FontSizes } from "@/theme/fontSize";
import Feather from "@expo/vector-icons/Feather";

// ChidrenScreen --------------------------------------------------------------------------
export default function ChildrenScreen() {
  // Variables
  const [children, setChildren] = useState<ChildData[]>([]);
  const [searchText, setSearchText] = useState("");

  //kildeinspirasjon https://www.geeksforgeeks.org/reactjs/how-to-implement-search-filter-functionality-in-reactjs/ (16.12.2025)
  // get searched children from API, based on search text with filter
  async function searchForChildren() {
    //Gets all children from DB
    const allChildren = await getAllChildrenById();
    //Filters children based on search text
    const filteredChildren = allChildren.filter((child) =>
      child.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setChildren(filteredChildren);
  }

  // Delays search while typing, to avoid too many requests
  useEffect(() => {
    const delayBounce = setTimeout(() => {
      // If search text is empty, get all children
      if (searchText === "") {
        getChildrenFromApi();
      } else {
        searchForChildren();
      }
      // Delay of 800milliseconds
    }, 800);
    return () => clearTimeout(delayBounce);
  }, [searchText]);

  // Loads when screen opens to fetch all children
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
      <View style={styles.searchField}>
        <Feather name="search" size={24} color="lightgrey" />
        <TextInput
          style={styles.searchText}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Søk etter barn..."
        />
      </View>
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
    marginTop: 10,
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
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
  searchField: {
    width: "85%",
    padding: 13,
    backgroundColor: Colors.primaryWhite,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    margin: 10,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchText: {
    marginLeft: 10,
    flex: 1,
    fontSize: FontSizes.H4,
  },
});
