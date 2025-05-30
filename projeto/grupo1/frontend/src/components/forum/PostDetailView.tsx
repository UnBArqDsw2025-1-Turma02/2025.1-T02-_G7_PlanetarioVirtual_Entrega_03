"use client";
import { User as UserIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createComment, deleteComment } from '@/services/api';
import type { PostWithComments, Comment as CommentType, User as UserType } from '@/services/api'; 
import { CommentForm } from './CommentForm';


type PostDetailViewProps = {
  initialPost: PostWithComments;
};


export function PostDetailView({ initialPost }: PostDetailViewProps) {
  const [post, setPost] = useState<PostWithComments>(initialPost);
  const { user } = useAuth();

  
  const handleCommentSubmit = async (commentText: string) => {
    if (!user) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    try {
      const newComment = await createComment(post.id, user, commentText);
      setPost(currentPost => ({
        ...currentPost,
        comentarios: [newComment, ...currentPost.comentarios].sort((a,b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
      }));
    } catch (error) {
        console.error("Erro ao criar comentário (mock):", error);
        alert("Falha ao criar o comentário.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user) {
      alert("Você precisa estar logado para realizar esta ação.");
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      try {
        await deleteComment(commentId); 
        setPost(currentPost => ({
          ...currentPost,
          comentarios: currentPost.comentarios.filter(c => c.id !== commentId)
        }));
      } catch (error) {
        console.error("Erro ao deletar comentário (mock):", error);
        alert("Falha ao deletar o comentário.");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
         <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
            <UserIcon className="h-7 w-7 text-gray-400" />
          </div>
          <div>
            <p className="text-xl font-semibold text-white">{post.autor.nome}</p>
            <p className="text-sm text-gray-400">
              Postado em {new Date(post.dataCriacao).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-300 leading-relaxed">{post.texto}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Comentários ({post.comentarios.length})</h2>
        
        <div className="mb-8">
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </div>

        <div className="space-y-6">
          {post.comentarios.length === 0 && (
            <p className="text-gray-500 text-center">Ainda não há comentários. Seja o primeiro!</p>
          )}
          {post.comentarios.map(comment => {
            const canDeleteThisComment = user && (user.tipo === 'moderador' || user.id === comment.autor.id);

            return (
              <div key={comment.id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="bg-gray-700 p-4 rounded-lg w-full relative"> 
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white">{comment.autor.nome}</p>
                    <p className="text-xs text-gray-400 pr-8"> 
                      {new Date(comment.dataCriacao).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <p className="text-gray-300">{comment.texto}</p>

                  {canDeleteThisComment && (
                     <button 
                       onClick={() => handleDeleteComment(comment.id)}
                       
                       
                       className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
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