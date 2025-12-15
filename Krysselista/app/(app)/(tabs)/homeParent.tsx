//
//
// Home screen for parents

// Sources:
// uuid: https://dev.to/tincastle/uuid-libraries-for-react-native-3mg

// Imports --------------------------------------------------------------------------
import {
  createChild,
  getChildrenByUserId,
  toggleChildPresence,
} from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { useAuthSession } from "@/providers/authenticationContext";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";

// HomeScreenParent --------------------------------------------------------------------------
export default function HomeScreenParent() {
  // Variables
  const { user } = useAuthSession();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [healthInfo, setHealthInfo] = useState<string>("Ingen");
  const [children, setChildren] = useState<ChildData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // UseEffects
  useEffect(() => {
    getChildrenFromApi();
  }, []);

  // Functions  --------------------------------------------------------------------------
  async function getChildrenFromApi() {
    setIsRefreshing(true);
    if (user?.id) {
      const children = await getChildrenByUserId(user.id);
      setChildren(children ?? []);
    } else {
      console.error(
        "Error! User id does not exist. This error should never happen."
      );
    }
    setIsRefreshing(false);
  }

  async function addNewChild() {
    setIsRefreshing(true);
    const child: ChildData = {
      id: uuid.v4().toString(),
      parentID: user?.id ?? "Error",
      name: name,
      birthday: birthday,
      healthInfo: healthInfo,
      acitivityLog: [],
      isPresent: false,
    };

    if (user?.id) {
      createChild(user?.id, child);
      setName("");
      setBirthday("");
      setHealthInfo("Ingen");
    } else {
      console.error(
        "Error! User id does not exist. This error should never happen."
      );
    }
    setIsRefreshing(false);
  }

  function checkIfParentsGotChild() {
    if (children.length === 0) {
      return <Text> Vennligst registrer barn.</Text>;
    } else {
      return children.map((child) => (
        <View key={child.id} style={style.childInfoContentBox}>
          {/* Avatar and name */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={style.avatar}>
              <Text style={style.avatarLetter}>{child.name[0]}</Text>
            </View>
            <View>
              <Text style={style.childNameText}>{child.name}</Text>
            </View>
          </View>

          {/* Child status */}
          <View
            style={
              child.isPresent ? style.childPresentBox : style.childAbsentBox
            }
          >
            <Text
              style={
                child.isPresent ? style.childPresentText : style.childAbsentText
              }
            >
              {child.isPresent ? "●  Til stede" : "●  Ikke til stede"}
            </Text>
          </View>

          {/* Child check out/in button */}
          <Pressable
            onPress={() => {
              toggleChildPresence(child.id, child.isPresent);
              getChildrenFromApi();
            }}
          >
            {child.isPresent ? (
              <View style={style.checkInChildButton}>
                <Feather name="log-out" size={24} color={Colors.primaryWhite} />
                <Text style={style.checkOutText}> Sjekk ut</Text>
              </View>
            ) : (
              <View style={style.checkOutChildButton}>
                <Feather name="log-in" size={24} color={Colors.primaryWhite} />
                <Text style={style.checkInText}> Sjekk inn</Text>
              </View>
            )}
          </Pressable>
        </View>
      ));
    }
  }

  // Return --------------------------------------------------------------------------
  return (
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <View style={style.container}>
        <View style={style.headerTextContainer}>
          <Text style={style.headerTitle}>Logget inn som {user?.name}</Text>
          <Text style={style.headerSubTitle}>Status for dine barn</Text>
        </View>

        {/* Child list */}
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {checkIfParentsGotChild()}

          {/* Add child button */}
          {isRefreshing ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Pressable
              onPress={() => setIsModalVisible(true)}
              style={style.registerChildButton}
            >
              <Text
                style={{
                  fontSize: FontSizes.H3,
                  color: Colors.primaryBlack,
                }}
              >
                Registrer barn
              </Text>
            </Pressable>
          )}
        </ScrollView>
        {/* Modal - Can be placed into its own file if we got time and should be moved to settings */}
        <Modal transparent visible={isModalVisible} animationType="slide">
          <View style={[style.container, { backgroundColor: Colors.darkGray }]}>
            <LinearGradient
              style={{ borderRadius: 20, margin: 30 }}
              colors={[Colors.backgroundPink, Colors.backgroundBlue]}
            >
              <View style={[style.modalContainer]}>
                {/* Back button */}
                <View style={style.backButton}>
                  <Pressable onPress={() => setIsModalVisible(false)}>
                    <Feather name="x" size={24} color={Colors.darkGray} />
                  </Pressable>
                </View>

                {/* Text fields */}
                <View style={style.textFieldContainer}>
                  <Text style={style.headingText}>Registrer ditt barn</Text>
                  <Text style={style.inputFieldText}>Navn</Text>
                  <TextInput
                    style={style.textField}
                    value={name}
                    placeholder="Fornavn og Etternavn"
                    onChangeText={setName}
                  />
                  <Text style={style.inputFieldText}>
                    Beskriv helseutfordringer
                  </Text>
                  <TextInput
                    style={style.textField}
                    value={healthInfo}
                    placeholder={healthInfo}
                    onChangeText={setHealthInfo}
                  />
                  <Text style={style.inputFieldText}>Fødselsdato</Text>
                  <TextInput
                    style={style.textField}
                    value={birthday}
                    placeholder="Eks. 20. november 2023"
                    onChangeText={setBirthday}
                  />

                  {/* Add button */}
                  <Pressable
                    onPress={() => {
                      if (name === "" || healthInfo === "" || birthday === "") {
                        Alert.alert(
                          "Error!",
                          "Vennligst fyll inn alle feltene."
                        );
                      } else {
                        addNewChild();
                        getChildrenFromApi();
                        setIsModalVisible(false);
                      }
                    }}
                    style={style.button}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.H3,
                        fontWeight: "bold",
                        color: Colors.primaryWhite,
                        alignSelf: "center",
                      }}
                    >
                      Legg til
                    </Text>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

// Styles --------------------------------------------------------------------------
const style = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: "center",
  },

  headerTitle: {
    color: Colors.primaryPurple,
    fontSize: FontSizes.H2,
    margin: 10,
  },
  headerSubTitle: {
    color: Colors.darkGray,
    fontSize: FontSizes.H3,
    paddingBottom: 10,
    fontWeight: "bold",
  },

  headerTextContainer: {
    marginTop: 70,
    alignItems: "center",
  },

  // Child card
  avatar: {
    width: 60,
    height: 60,
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
  childInfoContentBox: {
    width: "90%",
    margin: 10,
    backgroundColor: Colors.primaryWhite,
    padding: 20,
    borderRadius: 20,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  childNameText: {
    fontSize: FontSizes.H2,
    marginRight: 100,
  },

  avatarLetter: {
    color: Colors.primaryWhite,
    fontSize: FontSizes.H1,
  },

  // Child status
  childPresentBox: {
    backgroundColor: Colors.statusLightGreen,
    margin: 20,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: Colors.statusDarkGreen,
    borderWidth: 1,
    width: "90%",
  },
  childAbsentBox: {
    backgroundColor: Colors.statusLightRed,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    borderColor: Colors.statusDarkRed,
    borderWidth: 1,
    width: "90%",
  },
  childPresentText: {
    color: Colors.statusDarkGreen,
    fontWeight: "bold",
    alignSelf: "center",
  },
  childAbsentText: {
    color: Colors.statusDarkRed,
    fontWeight: "bold",
    alignSelf: "center",
  },

  // Check in/out button
  checkInChildButton: {
    backgroundColor: Colors.statusDarkRed,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 10,
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 2 },
    alignSelf: "center",
  },
  checkOutChildButton: {
    backgroundColor: Colors.statusDarkGreen,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    padding: 10,
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 2 },
    alignSelf: "center",
  },
  checkInText: {
    color: Colors.primaryWhite,
    fontSize: FontSizes.H3,
  },
  checkOutText: {
    color: Colors.primaryWhite,
    fontSize: FontSizes.H3,
  },

  // Modal
  headingText: {
    color: Colors.primaryPurple,
    fontSize: FontSizes.H1,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    marginTop: 6,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    backgroundColor: Colors.primaryWhite,
  },
  textFieldContainer: {
    width: "100%",
    padding: 40,
  },
  button: {
    backgroundColor: Colors.variationPurple,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    margin: 20,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButton: {
    paddingRight: 30,
    paddingTop: 30,
  },
  inputFieldText: {
    color: Colors.darkGray,
    fontSize: FontSizes.H4,
    marginTop: 10,
  },
  registerChildButton: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    width: "90%",
    backgroundColor: Colors.primaryWhite,
    alignItems: "center",
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
    margin: 10,
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 2 },
  },
});
