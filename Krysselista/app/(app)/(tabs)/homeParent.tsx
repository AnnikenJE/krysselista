//
//
// Home screen for parents

// Sources:
// uuid: https://dev.to/tincastle/uuid-libraries-for-react-native-3mg

//TODO: Design when designers says its OK

// Imports
import {
  createChild,
  getChildrenByUserId,
} from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { useAuthSession } from "@/providers/authenticationContext";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import uuid from "react-native-uuid";

// HomeScreenParent
export default function HomeScreenParent() {
  // Variables
  const { user } = useAuthSession();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [healthInfo, setHealthInfo] = useState<string>("Ingen");
  const [children, setChildren] = useState<ChildData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getChildrenFromApi();
  }, []);

  // Functions
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
        <View key={child.id}>
          <Text>{child.name}</Text>
        </View>
      ));
    }
  }

  // Return
  return (
    <View style={style.container}>
      <Text>Hei {user?.name}</Text>
      {checkIfParentsGotChild()}
      {isRefreshing ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text>Registrer barn</Text>
        </Pressable>
      )}
      {/* Modal - Can be placed into its own file if we got time */}
      <Modal transparent visible={isModalVisible} animationType="slide">
        <View
          style={[style.container, { backgroundColor: Colors.primaryWhite }]}
        >
          <Pressable onPress={() => setIsModalVisible(false)}>
            <View>
              <Feather name="arrow-left" size={24} color="black" />
              <Text>Tilbake</Text>
            </View>
          </Pressable>
          <View style={style.textFieldContainer}>
            <Text style={style.headingText}>Registrer ditt barn</Text>
            <Text>Navn</Text>
            <TextInput
              style={style.textField}
              value={name}
              placeholder="Fornavn og Etternavn"
              onChangeText={setName}
            />
            <Text>Beskriv helseutfordringer</Text>
            <TextInput
              style={style.textField}
              value={healthInfo}
              placeholder={healthInfo}
              onChangeText={setHealthInfo}
            />
            <Text>Fødselsdato</Text>
            <TextInput
              style={style.textField}
              value={birthday}
              placeholder="Eks. 20. november 2023"
              onChangeText={setBirthday}
            />
            <Pressable
              onPress={() => {
                if (name === "" || healthInfo === "" || birthday === "") {
                  Alert.alert("Error!", "Vennligst fyll inn alle feltene.");
                } else {
                  addNewChild();
                  getChildrenFromApi();
                  setIsModalVisible(false);
                }
              }}
            >
              <Text>Legg til</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Style
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    marginTop: 6,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    backgroundColor: Colors.primaryWhite,
  },
  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },
  headingText: {
    color: Colors.primaryPurple,
    fontSize: FontSizes.H1,
  },
});
