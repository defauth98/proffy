import React, { createContext, useState } from 'react';
import { SegmentedControlIOSComponent } from 'react-native';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object;
  login(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({});

  async function login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password,
    });

    if (response.status !== 400) {
      setUser(response.data);
    }

    setUser(response.data.user);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
