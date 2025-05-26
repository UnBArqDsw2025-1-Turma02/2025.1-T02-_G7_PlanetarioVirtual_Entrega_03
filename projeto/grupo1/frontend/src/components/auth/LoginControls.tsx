"use client";

import { useAuth } from "@/contexts/AuthContext";

export function LoginControls() {
  const { login } = useAuth();

  return (
    <div 
      className="flex flex-col items-center justify-center bg-gray-800 p-10 rounded-lg border border-gray-700"
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-2">
        Bem-vindo!
      </h1>
      <p className="text-gray-400 mb-8">
        Escolha como deseja entrar no sistema.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={() => login('comum')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Logar como Usuário
        </button>
        <button
          onClick={() => login('moderador')}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Logar como Administrador
        </button>
      </div>
    </div>
  );
}