import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: {
    token?: string;
    login?: string;
  } | null;
  login: (token: string, login: string) => void;
  register: (token: string, login: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = (token: string, login: string) => {
    setUser({ token, login });
  };

  const register = (token: string, login: string) => {
    setUser({ token, login });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
