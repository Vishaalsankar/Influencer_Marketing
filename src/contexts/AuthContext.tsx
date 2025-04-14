
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demonstration
const SAMPLE_USERS = [
  {
    user_id: "1",
    email: "admin@promopulse.com",
    role: "admin" as UserRole,
    name: "Admin User",
    created_at: new Date().toISOString(),
    profile_image: "/placeholder.svg",
  },
  {
    user_id: "2",
    email: "brand@promopulse.com",
    role: "brand" as UserRole,
    name: "Brand User",
    created_at: new Date().toISOString(),
    profile_image: "/placeholder.svg",
  },
  {
    user_id: "3",
    email: "influencer@promopulse.com",
    role: "influencer" as UserRole,
    name: "Influencer User",
    created_at: new Date().toISOString(),
    profile_image: "https://source.unsplash.com/random/200x200/?person",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("promopulse_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, we would authenticate with Supabase
      // For now, just check against our sample users
      const user = SAMPLE_USERS.find(u => u.email === email);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      // Store user in local storage for persistence
      localStorage.setItem("promopulse_user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app with Supabase, this would create a new user
      // For demo, create a mock user and add to local storage
      const newUser: User = {
        user_id: `user-${Date.now()}`,
        email,
        name,
        role,
        created_at: new Date().toISOString(),
        profile_image: "/placeholder.svg",
      };
      
      // Store user in local storage for persistence
      localStorage.setItem("promopulse_user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("promopulse_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        userRole: user?.role || null,
      }}
    >
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
