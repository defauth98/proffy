import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface UserData {
  name: string;
  surname: string;
  email: string;
  avatar: string;
  bio: string;
  whatsapp: string;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(email: string, password: string, save: boolean): Promise<void>;
  signUp(
    email: string,
    password: string,
    name: string,
    surname: string
  ): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNauth:user');
      const storagedToken = await AsyncStorage.getItem('@RNauth:token');

      if (storagedUser && storagedToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    loadSoragedData();
  }, []);

  async function setUserAndToken(user: object, token: string, save: boolean) {
    setUser(user);

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    if (save) {
      await AsyncStorage.setItem('@RNauth:user', JSON.stringify(user));
      await AsyncStorage.setItem('@RNauth:token', JSON.stringify(user));
    }
  }

  async function signIn(email: string, password: string, save: boolean) {
    const response = await api.post('/login', { email, password });
    await setUserAndToken(response.data.user, response.data.token, save);
  }

  async function signUp(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const response = await api.post('/signup', {
      name,
      surname,
      email,
      password,
    });

    await setUserAndToken(response.data.user, response.data.token, false);
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
