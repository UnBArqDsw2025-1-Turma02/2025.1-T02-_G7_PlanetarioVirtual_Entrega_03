"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image'; 

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Image
                src="/logo.svg" 
                alt="Logo Planetário Virtual"
                width={40} 
                height={40} 
                className="h-10 w-auto" 
              />
              <span>Planetário Virtual</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Início
              </Link>
              <Link href="/usuarios" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Usuários
              </Link>
              <Link href="/meu-perfil" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Meu Perfil
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Bem-vindo(a), {user.nome}!</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}