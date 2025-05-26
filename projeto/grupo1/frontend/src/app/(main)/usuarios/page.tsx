import { getUsers } from '@/services/api';
import { UserCard } from '@/components/users/UserCard';
import { Suspense } from 'react';

async function UserList() {
  const users = await getUsers();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default function UsuariosPage() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Membros da Comunidade</h1>
      
      <Suspense fallback={<p className="text-center text-gray-400">Carregando usuários...</p>}>
        <UserList />
      </Suspense>
    </div>
  );
}