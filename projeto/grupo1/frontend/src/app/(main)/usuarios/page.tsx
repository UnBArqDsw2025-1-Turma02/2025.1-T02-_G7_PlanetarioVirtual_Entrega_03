"use client";

import { useState, useEffect } from 'react';
import { getUsers, User } from '@/services/api';
import { UserCard } from '@/components/users/UserCard';
import { toast } from 'react-toastify';

function UserListComponent({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className="text-center text-gray-400">Nenhum membro encontrado.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const usuariosRecebidos = await getUsers();
        setUsers(usuariosRecebidos);
        if (usuariosRecebidos.length > 0) {
          toast.success('Membros carregados com sucesso!');
        } else {
          toast.info('Nenhum membro encontrado.');
        }

      } catch (erroCapturado) {
        const mensagem = erroCapturado instanceof Error ? erroCapturado.message : 'Erro desconhecido.';
        setErrorMsg(mensagem);
        toast.error(`Falha ao carregar membros: ${mensagem}`);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Membros da Comunidade</h1>

      {isLoading && <p className="text-center text-gray-400">Carregando usuários...</p>}

      {!isLoading && errorMsg && (
        <p className="text-center text-red-500 bg-red-900/20 p-3 rounded-md">
          <strong>Erro:</strong> {errorMsg}
        </p>
      )}

      {!isLoading && !errorMsg && <UserListComponent users={users} />}
    </div>
  );
}