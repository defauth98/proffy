import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { LoginResponse } from '../types/LoginRequestType';

export interface UserData {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  bio: string;
  whatsapp: string;
}

interface AuthContextData {
  signed: boolean;
  user: UserData | null;
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
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSoragedData() {
      const storagedUser = localStorage.getItem('@RNauth:user');
      const storagedToken = localStorage.getItem('@RNauth:token');

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

  async function setUserAndToken(user: UserData, token: string, save: boolean) {
    setUser(user);

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    if (save) {
      localStorage.setItem('@RNauth:user', JSON.stringify(user));
      localStorage.setItem('@RNauth:token', JSON.stringify(token));
    }
  }

  async function signIn(email: string, password: string, save: boolean) {
    try {
      const response = await api.post('/login', { email, password }) as LoginResponse;

      if(response.status === 200) {
        await setUserAndToken(response.data.user, response.data.token, save);

        toast.success('Login efetuado com sucesso',{
          theme: "light",
          closeButton: false,
          progressStyle: {
            background: '#8257E5'
          },
          autoClose: 2000
        });
      }

      if(response.status === 500) {
        toast.info('Eita, talvez a API esteja fora, aguarde um instante e tente novamente  :(' ,{
          theme: "light",
          closeButton: false,
          progressStyle: {
            background: '#8257E5'
          },
          autoClose: 2000
        });
      }
    } catch (error) {
        toast.error('Dados inválidos, tente novamente' ,{
          theme: "light",
          closeButton: false,
          progressStyle: {
            background: '#8257E5'
          },
          autoClose: 2000
        });
    }
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

    if (response.data.user[0].id) {
      signIn(email, password, true);
    } else {
      return;
    }
  }

  async function signOut() {
    localStorage.clear();

    setUser(null);
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
