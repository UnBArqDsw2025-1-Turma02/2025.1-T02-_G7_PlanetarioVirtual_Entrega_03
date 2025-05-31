"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  nome: string;
  tipo: 'comum' | 'moderador';
};

type AuthContextType = {
  user: User | null;
  login: (tipo: 'comum' | 'moderador') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (tipo: 'comum' | 'moderador') => {
    let userData: User;
    if (tipo === 'moderador') {
      userData = { id: 1, nome: 'Milena Rocha', tipo: 'moderador' };
    } else {
      userData = { id: 2, nome: 'Rafael Pereira', tipo: 'comum' };
    }
    setUser(userData);
    console.log(`Usuário logado como: ${userData.nome} (${userData.tipo})`);
    router.push('/'); 
  };

  const logout = () => {
    setUser(null);
    console.log('Usuário deslogado.');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}