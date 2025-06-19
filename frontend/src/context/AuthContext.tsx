import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define type for Admin and Context
type AdminData = {
  id: string;
  email: string;
};

type AuthContextType = {
  admin: AdminData | null;
  login: (data: AdminData, token: string) => void;
  logout: () => void;
  token: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // On load, try to restore from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedAdmin = localStorage.getItem("admin");
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (data: AdminData, token: string) => {
    setAdmin(data);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(data));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
