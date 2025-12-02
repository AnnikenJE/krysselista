import { createUser, setUserDisplayName, signIn, signOut } from "@/api/authApi";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Definition of the AuthContextType
type AuthContextType = {
  signIn: (userEmail: string, password: string) => void;
  signOut: VoidFunction;
  createUser: (email: string, password: string, displayName: string) => void;
  userNameSession?: string | null;
  isLoading: boolean;
  user: User | null;
};

// Creation of the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the AuthContext
export function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      "UseAuthSession must be used within an AuthContext Provider"
    );
  }

  return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAuthSession, setUserAuthSesseion] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUserSession(user.displayName);
        setUserAuthSesseion(user);
      } else {
        setUserSession(null);
        setUserAuthSesseion(null);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    router.replace("/");
  }, [isLoading, router, userSession]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userEmail: string, password: string) => {
          signIn(userEmail, password);
        },
        signOut: () => {
          signOut();
        },
        createUser: async (
          email: string,
          password: string,
          displayName: string
        ) => {
          const newUser = await createUser(email, password);
          if (newUser) {
            await setUserDisplayName(newUser, displayName);
            setUserSession(displayName);
          }
        },
        userNameSession: userSession,
        isLoading: isLoading,
        user: userAuthSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
