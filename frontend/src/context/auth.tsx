import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import User from '../models/User';
import { api } from '../services/api';

type LoginResponse = { user: User; token: string };

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isSignedIn: boolean;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('Medicar@auth_user');

    return storedUser && JSON.parse(storedUser);
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('Medicar@auth_token'),
  );

  const isSignedIn = useMemo(() => {
    return user !== null;
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('Medicar@auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('Medicar@auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('Medicar@auth_token', JSON.stringify(token));
    } else {
      localStorage.removeItem('Medicar@auth_token');
    }
  }, [token]);

  async function login({ email, password }: LoginCredentials) {
    const response = await api.post<LoginResponse>('login/', {
      email,
      password,
    });

    const { user, token } = response.data;

    setUser(user);
    setToken(token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, isSignedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
