import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
  };

  const value = {
    currentUser,
    role,
    setCurrentUser,
    setRole,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin: role === ROLES.ADMIN,
    isUser: role === ROLES.USER
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}