//
//
// Home screen for parents

// Imports
import { createChild } from "@/api/childrenApi";
import { ChildData } from "@/interfaces/child";
import { useAuthSession } from "@/providers/authenticationContext";
import { Colors } from "@/theme/colors";
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

// Main
export default function HomeScreenParent() {
  const { user } = useAuthSession();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [healthInfo, setHealthInfo] = useState<string>("Ingen");

  function addNewChild() {
    const child: ChildData = {
      id: "",
      name: "",
      birthday: "",
      healthInfo: "",
      acitivityLog: [],
      isPresent: false,
    };

    if (user?.uid) {
      createChild(user?.uid, child);
    } else {
      console.error(
        "Error! User id does not exist. This error should never happen."
      );
    }
    console.log("HER:", user?.uid);
  }

  return (
    <View style={style.container}>
      <Text>Home parent</Text>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text>Registrer barn</Text>
      </Pressable>

      <Modal transparent visible={isModalVisible} animationType="slide">
        <View
          style={[style.container, { backgroundColor: Colors.primaryWhite }]}
        >
          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>Tilbake</Text>
          </Pressable>
          <View>
            <TextInput
              style={style.textField}
              value={name}
              placeholder="Navn"
              onChangeText={setName}
            />
            <TextInput
              style={style.textField}
              value={healthInfo}
              placeholder={healthInfo}
              onChangeText={setHealthInfo}
            />
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    borderWidth: 0.165,
    padding: 10,
    marginTop: 6,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
});
