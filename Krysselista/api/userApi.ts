//
//
// User API connection to firebase.

// imports --------------------------------------------------------------------------
import { UserData } from "@/interfaces/user";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Functions -------------------------------------------------------------------------

// Create user
// TODO: Is not used in authAPI.
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

// Update user email
export async function updateUserEmail(userId: string, email: string) {
  try {
    await updateDoc(doc(db, "users", userId), { email });
    console.log("Successfully updated email for user: ", userId);
  } catch (error) {
    console.error("Error updating email: ", error);
  }
}

// Update user phone
export async function updateUserPhone(userId: string, phone: string) {
  try {
    await updateDoc(doc(db, "users", userId), { phone });
    console.log("Successfully updated phone for user: ", userId);
  } catch (error) {
    console.error("Error updating phone: ", error);
  }
}

// Add child to user
export async function addChildToUser(userId: string, childId: string) {
  try {
    await updateDoc(doc(db, "users", userId), {
      children: arrayUnion(childId),
    });
    console.log("Successfully added child for user: ", userId);
  } catch (error) {
    console.error("Error adding child: ", error);
  }
}