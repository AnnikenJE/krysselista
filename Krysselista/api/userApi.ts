//
//
// User API connection to firebase.

import { UserData } from "@/interfaces/user";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Functions

// Create user
export async function createUser(userID: string, user: UserData) {
  try {
    await setDoc(doc(db, "users", userID), user);
    console.error("New user created with ID: ", userID);
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

// Get all children connected to one parent (user)
export async function getUserChildren() {
  try {
    const query = await getDocs(collection(db, "users"));
    const targetUsersChildren = query.docs.filter((doc) => )

  } catch (error) {
    console.error("Error! Could not get the users children: ", error);
    return [];
  }
}

// Update user
export async function updateUser() {
  try {



  } catch (error) {
    console.error("Error! Could not update user: ", error);
  }
}
