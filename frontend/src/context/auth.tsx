import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import User from '../models/User';
import api from '../services/api';

type LoginResponse = { user: User; token: string };

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isSignedIn: boolean;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
  signUp(credentials: SignupCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isSignedIn = useMemo(() => {
    return user !== null;
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem('Medicar@auth_user');
    const storedToken = localStorage.getItem('Medicar@auth_token');

    setToken(storedToken);
    setUser(storedUser && JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('Medicar@auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('Medicar@auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('Medicar@auth_token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('Medicar@auth_token');
      delete api.defaults.headers.authorization;
    }
  }, [token]);

  async function login({ email, password }: LoginCredentials) {
    try {
      const response = await api.post<LoginResponse>('login/', {
        email,
        password,
      });

      const { user, token } = response.data;

      setToken(token);
      setUser(user);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        throw new Error('E-mail e/ou senha incorretos.');
      }

      throw new Error('Não foi possível realizar o login.');
    }
  }

  async function signUp({
    name,
    email,
    password,
    passwordConfirmation,
  }: SignupCredentials) {
    if (password !== passwordConfirmation) {
      throw new Error('Os dois campos de senha não combinam.');
    }

    try {
      const { data: user } = await api.post<User>('users/', {
        name,
        email,
        password,
      });

      await login({ email: user.email, password });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        const { detail } = err.response.data;
        throw new Error(detail);
      }

      throw new Error('Não foi possível criar a conta.');
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isSignedIn, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
