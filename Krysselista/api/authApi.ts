//
//
//  authApi.ts - Api components for authentication

import { auth, db } from "@/firebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Login with with user email and password
export async function signIn(email: string, password: string) {
	await signInWithEmailAndPassword(auth, email, password);
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	console.log("User signed in: ", userCredential.user.email);
}

// Logout current user
export async function signOut() {
	await auth.signOut();
	console.log("User signed out.");
}

// Create new user with email and password
export async function createUser(
	name: string,
	email: string,
	password: string,
	address: string,
	phone: string,
	isEmployee: boolean
) {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredentials.user;

		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			name,
			email,
			address,
			phone,
			isEmployee,
			children: [],
		});

		return user;
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
