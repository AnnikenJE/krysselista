//
//
//

import { createUser, setUserDisplayName, signIn, signOut } from "@/api/authApi";
import { getUser } from "@/api/userApi";
import { auth } from "@/firebaseConfig";
import { UserData } from "@/interfaces/user";
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

// Type defintion for AuthContext
type AuthContextType = {
	signIn: (userEmail: string, password: string) => Promise<void>;
	signOut: VoidFunction;
	createUser: (
		email: string,
		password: string,
		displayName: string,
		address: string,
		phone: string,
		isEmployee: boolean
	) => Promise<void>;
	userNameSession?: string | null;
	isLoading: boolean;
	user: UserData | null; // App-specific user data (contains isEmployee etc.)
	userAuthSession?: User | null; // Raw Firebase User object (contains uid etc.)
};

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use AuthContext in components
export function useAuthSession() {
	const value = useContext(AuthContext);
	if (!value) {
		throw new Error(
			"useAuthSession must be used within an AuthContext Provider"
		);
	}
	return value;
}

// Provider component that wraps the app and manages auth state
export function AuthSessionProvider({ children }: { children: ReactNode }) {
	const [userNameSession, setUserNameSession] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userAuthSession, setUserAuthSession] = useState<User | null>(null);
	const [userProfile, setUserProfile] = useState<UserData | null>(null);

	const router = useRouter();

	// Listen to Firebase auth state changes (login/logout)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			console.log("onAuthStateChanged -> firebaseUser:", firebaseUser);
			setIsLoading(true);

			if (firebaseUser) {
				// User is signed in
				setUserAuthSession(firebaseUser); // Store Firebase user object
				setUserNameSession(firebaseUser.displayName ?? null);

				try {
					// Fetch the app-specific user profile from Firestore using UID
					const profile = await getUser(firebaseUser.uid);
					if (profile) {
						setUserProfile(profile);
						console.log("Fetched user profile:", profile);
					} else {
						const fallback: UserData = {
							// If profile not found, create a fallback with default values
							id: firebaseUser.uid,
							name: firebaseUser.displayName ?? "",
							email: firebaseUser.email ?? "",
							address: "",
							phone: "",
							isEmployee: false,
							children: [],
						};
						setUserProfile(fallback);
						console.warn(
							"User profile not found in Firestore. Using fallback:",
							fallback
						);
					}
				} catch (err) {
					console.error("Failed to fetch user profile from Firestore:", err);
					setUserProfile(null);
				}
			} else {
				// User signed out. Clear all auth data
				setUserAuthSession(null);
				setUserNameSession(null);
				setUserProfile(null);
			}

			setIsLoading(false);
		});

		// Cleanup: unsubscribe from listener
		return () => {
			unsubscribe();
			console.log("onAuthStateChanged unsubscribed");
		};
	}, []);

	// Navigate to root after auth state is determined
	useEffect(() => {
		if (isLoading) return;
		router.replace("/");
	}, [isLoading, router, userNameSession]);

	return (
		<AuthContext.Provider
			value={{
				signIn: async (userEmail: string, password: string) => {
					await signIn(userEmail, password);
				},
				signOut: () => {
					signOut();
				},
				createUser: async (
					email: string,
					password: string,
					displayName: string,
					address: string,
					phone: string,
					isEmployee: boolean
				) => {
					const newUser = await createUser(
						email,
						password,
						address,
						phone,
						isEmployee,
					);
					if (newUser) {
						await setUserDisplayName(newUser, displayName);
						setUserNameSession(displayName);
					}
				},
				userNameSession,
				isLoading,
				user: userProfile,
				userAuthSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
