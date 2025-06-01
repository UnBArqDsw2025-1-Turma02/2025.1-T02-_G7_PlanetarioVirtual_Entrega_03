"use client";
import { User as UserIcon, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import { createCommentAPI, deleteCommentAPI } from '@/services/api';
import type { PostWithComments } from '@/services/api';
import { CommentForm } from './CommentForm';
import { toast } from 'react-toastify';

type PostDetailViewProps = {
  initialPost: PostWithComments | null;
};

export function PostDetailView({ initialPost }: PostDetailViewProps) {
  const [post, setPost] = useState<PostWithComments | null>(initialPost);
  const { user } = useAuth(); 

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const handleCommentSubmit = async (commentText: string) => {
    if (!user) {
      toast.warn("Você precisa estar logado para comentar.");
      return;
    }
    if (!post) {
        toast.error("Não é possível adicionar comentário: post não carregado.");
        return;
    }
    if (!commentText.trim()) {
        toast.warn("O comentário não pode estar vazio.");
        return;
    }

    try {
      const novoComentarioDaApi = await createCommentAPI(post.id, commentText, user.id);
      setPost(currentPost => {
        if (!currentPost) return null;
        const comentariosAtualizados = [novoComentarioDaApi, ...currentPost.comentarios]
          .sort((a,b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
        return {
          ...currentPost,
          comentarios: comentariosAtualizados
        };
      });
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Falha desconhecida ao enviar comentário.";
        console.error("Erro ao criar comentário via API:", error);
        toast.error(`Falha ao criar o comentário: ${msg}`);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user) {
      toast.warn("Você precisa estar logado para realizar esta ação.");
      return;
    }
    if (!post) {
        toast.error("Não é possível deletar comentário: post não carregado.");
        return;
    }

     const confirmDelete = window.confirm('Tem certeza que deseja excluir este comentário?');
     if (!confirmDelete) {
       return;
     }

    try {
      
      const resultado = await deleteCommentAPI(commentId, user.id);

      if (resultado.success) {
        
        setPost(currentPost => {
          if (!currentPost) return null;
          return {
            ...currentPost,
            comentarios: currentPost.comentarios.filter(c => c.id !== commentId)
          };
        });
        toast.success("Comentário deletado com sucesso!");
      } else {
        
        toast.error(resultado.message || "Falha ao deletar o comentário.");
      }
    } catch (error) {
        
        const msg = error instanceof Error ? error.message : "Erro desconhecido ao tentar deletar.";
        console.error("Erro ao deletar comentário via API:", error);
        toast.error(`Falha ao deletar o comentário: ${msg}`);
    }
  };

  if (!post) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <h1 className="text-xl font-semibold text-gray-400 text-center py-10">
          Carregando detalhes da postagem ou postagem não encontrada...
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 mb-8">
         <div className="flex items-start sm:items-center mb-4 flex-col sm:flex-row">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
            <UserIcon className="h-7 w-7 text-gray-400" />
          </div>
          <div className="w-full">
            <p className="text-xl font-semibold text-white">{post.autor.nome}</p>
            <p className="text-sm text-gray-400">
              Postado em {new Date(post.dataCriacao).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">{post.texto}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Comentários ({post.comentarios.length})</h2>
        
        <div className="mb-8">
          {user ? <CommentForm onCommentSubmit={handleCommentSubmit} /> : <p className="text-gray-400">Você precisa estar <a href="/login" className="text-sky-400 hover:text-sky-300">logado</a> para comentar.</p>}
        </div>

        <div className="space-y-6">
          {post.comentarios.length === 0 && (
            <p className="text-gray-500 text-center py-4">Ainda não há comentários. Seja o primeiro!</p>
          )}
          {post.comentarios.map(comment => {
            const canDeleteThisComment = user && (user.tipo === 'moderador' || user.id === comment.autor.id);
            return (
              <div key={comment.id} className="flex gap-3 sm:gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <UserIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="bg-gray-700 p-4 rounded-lg w-full relative shadow">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white text-sm sm:text-base">{comment.autor.nome}</p>
                    <p className="text-xs text-gray-400 pr-8 sm:pr-10">
                      {new Date(comment.dataCriacao).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base whitespace-pre-wrap">{comment.texto}</p>

                  {canDeleteThisComment && (
                     <button
                       onClick={() => handleDeleteComment(comment.id)}
                       className="absolute top-2 right-2 p-1.5 rounded-full text-gray-500 hover:bg-red-800/30 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
                       title="Excluir comentário"
                     >
                       <Trash2 size={16} />
                     </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
