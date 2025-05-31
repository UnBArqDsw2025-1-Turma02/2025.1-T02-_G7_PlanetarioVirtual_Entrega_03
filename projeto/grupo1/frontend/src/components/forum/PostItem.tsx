"use client";

import type { Post } from '@/services/api';
import Link from 'next/link';
import { MessageCircle, Trash2, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type PostItemProps = {
  post: Post;
  onDelete: (postId: number) => void;
};

export function PostItem({ post, onDelete }: PostItemProps) {
  const { user } = useAuth();


  const canDelete = user && (user.tipo === 'moderador' || user.id === post.autor.id);


  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta postagem? Todos os comentários associados também serão excluídos.')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg mb-6 overflow-hidden relative">
      {canDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-red-500/20 hover:text-red-400 z-10 transition-colors"
          title="Excluir postagem"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div className="block p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
            <UserIcon className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-white">{post.autor.nome}</p>
            <p className="text-xs text-gray-400">
              Postado em {new Date(post.dataCriacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <p className="text-gray-300 min-h-[40px]">{post.texto}</p>
      </div>

      <Link href={`/postagens/${post.id}#comentar`}>
        <div className="bg-gray-800/50 border-t border-gray-700 px-6 py-3 flex justify-between items-center hover:bg-gray-700/50 transition-colors duration-200">
          <div className="flex items-center gap-2 text-gray-400">
            <MessageCircle size={16} />
            <span className="text-sm font-medium">Comentários</span>
          </div>
        </div>
      </Link>
    </div>
  );
}