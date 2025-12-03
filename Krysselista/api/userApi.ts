//
//
// User API connection to firebase.

import { UserData } from "@/interfaces/user";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Functions

// Create user
export async function createUser(userID: string, user: UserData) {
  try {
    await setDoc(doc(db, "users", userID), user);
    console.log("New user created with ID: ", userID);
  } catch (error) {
    console.error("Error! Could not create user: ", error);
  }
}

// Get user
export async function getUser(userId: string) {
  try {
    const query = await getDoc(doc(db, "users", userId));
    const user = query.data() as UserData;

    console.log("User fetched from firebase with id: ", userId);
    return user;
  } catch (error) {
    console.error("Error! Could not get user: ", error);
    return null;
  }
}

// Update user
export async function updateUser(
  userId: string,
  email: string,
  phone: string,
  childId: string
) {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      email: email,
      phone: phone,
      children: arrayUnion(childId),
    });

    console.log("Successfully updated ");
  } catch (error) {
    console.error("Error! Could not update user: ", error);
  }
}
