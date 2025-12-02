//
//
//  authApi.ts - Api components for authentication

import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";


//Login with with user email and password
export async function signIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in: ", userCredential.user.email);
    })
    .catch((error) => console.log("Error! Cannot login: ", error));
}

// Logout current user
export async function signOut() {
  await auth.signOut();
  console.log("User signed out.");
}

// Create new user with email and password
export async function createUser(email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredentials.user;
  } catch (error) {
    console.error("Error! Could not create user: ", error);
    return null;
  }
}

// Set display name for user
export async function setUserDisplayName(user: User, displayName: string) {
  try {
    await updateProfile(user, {
      displayName: displayName,
    });
  } catch (error) {
    console.error("Error! Cannot make username: ", error);
    return null;
  }
}
