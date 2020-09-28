import React, { createContext, useState } from 'react';
import api from '../services/api';

export interface AuthContextData {
  signed: boolean;
  user: object;
  token: string;
  login(email: string, password: string): Promise<void>;
  SignIn(
    email: string,
    password: string,
    name: string,
    surname: string
  ): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [signed, setSigned] = useState(false);

  async function login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password,
    });

    setUser(response.data.user);
    setToken(response.data.token);
    setSigned(true);
  }

  async function SignIn(
    name: string,
    password: string,
    surname: string,
    email: string
  ) {
    const response = await api.post('signup', {
      name,
      surname,
      email,
      password,
    });

    setUser(response.data.user);
    setToken(response.data.token);
    setSigned(true);
  }

  return (
    <AuthContext.Provider value={{ signed, user, token, login, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
