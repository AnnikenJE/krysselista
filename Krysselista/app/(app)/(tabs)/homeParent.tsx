//
//
// Home screen for parents

// Sources:
// uuid: https://dev.to/tincastle/uuid-libraries-for-react-native-3mg

// Imports
import { createChild } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { useAuthSession } from "@/providers/authenticationContext";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Alert,
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

  // Functions
  function addNewChild() {
    const child: ChildData = {
      id: uuid.v4(),
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
  }

  // Return
  return (
    <View style={style.container}>
      <Text>Home parent</Text>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text>Registrer barn</Text>
      </Pressable>

      {/* Modal - Can be placed into its own file  */}
      <Modal transparent visible={isModalVisible} animationType="slide">
        <View
          style={[style.container, { backgroundColor: Colors.primaryWhite }]}
        >
          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>Tilbake</Text>
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
    borderColor: Colors.darkGray,
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
  }
});
