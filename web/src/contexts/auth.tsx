import React, { createContext, useState } from 'react';
import api from '../services/api';

export interface AuthContextData {
  signed: boolean;
  user: User;
  token: string;
  subject: string;
  subjectId: string;
  login(email: string, password: string): Promise<void>;
  SignIn(
    email: string,
    password: string,
    name: string,
    surname: string
  ): Promise<void>;
}

interface User {
  id: string;
  name: string;
  surname: string;
  avatar: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [userState, setUser] = useState<User>({} as User);
  const [token, setToken] = useState('');
  const [signed, setSigned] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjectId, setSubjectId] = useState('');

  async function login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password,
    });

    const subject = await api.get(`/classes/${response.data.user.id}`, {
      headers: { Authorization: `Bearer ${response.data.token}` },
    });

    setUser({
      id: response.data.user.id,
      name: response.data.user.name,
      surname: response.data.user.surname,
      avatar: response.data.user.avatar,
    });
    setToken(response.data.token);
    setSigned(true);

    setSubject(subject.data.class.subject);
    setSubjectId(subject.data.class.id);
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

    const subject = await api.get(`/classes/${response.data.user.id}`, {
      headers: { Authorization: `Bearer ${response.data.token}` },
    });

    setUser({
      id: response.data.user.id,
      name: response.data.user.name,
      surname: response.data.user.surname,
      avatar: response.data.user.avatar,
    });
    setToken(response.data.token);
    setSigned(true);

    setSubject(subject.data.class.subject);
    setSubjectId(subject.data.class.id);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        user: userState,
        token,
        login,
        SignIn,
        subject,
        subjectId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
