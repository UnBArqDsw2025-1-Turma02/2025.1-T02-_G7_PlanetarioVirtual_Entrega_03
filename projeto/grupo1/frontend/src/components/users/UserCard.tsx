import type { User } from '@/services/api';
import { User as UserIcon } from 'lucide-react';

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <UserIcon className="h-7 w-7 text-gray-400" />
      </div>
      <div className="flex-grow">
        <p className="font-bold text-white">{user.nome}</p>
        {user.tipo === 'moderador' ? (
          <span className="text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">
            Administrador
          </span>
        ) : (
          <span className="text-xs text-gray-400">
            Usuário
          </span>
        )}
      </div>
    </div>
  );
}