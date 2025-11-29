import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    User,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authError, setAuthError] = useState(false);

    useEffect(() => {
        // Try to initialize Firebase auth
        try {
            // Lazy load auth to prevent crashes
            import("@/config/firebase").then(({ auth }) => {
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    setUser(user);

                    // Check if user is admin
                    if (user) {
                        const adminCheck = user.email?.includes('admin') || false;
                        setIsAdmin(adminCheck);
                    } else {
                        setIsAdmin(false);
                    }

                    setLoading(false);
                });

                return () => unsubscribe();
            }).catch((error) => {
                console.warn("Firebase auth not configured:", error);
                setAuthError(true);
                setLoading(false);
            });
        } catch (error) {
            console.warn("Firebase initialization error:", error);
            setAuthError(true);
            setLoading(false);
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const { auth } = await import("@/config/firebase");
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(error.message || "Failed to sign in");
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const { auth } = await import("@/config/firebase");
            const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
        } catch (error: any) {
            throw new Error(error.message || "Failed to sign up");
        }
    };

    const signOut = async () => {
        try {
            const { auth } = await import("@/config/firebase");
            await firebaseSignOut(auth);
        } catch (error: any) {
            throw new Error(error.message || "Failed to sign out");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
