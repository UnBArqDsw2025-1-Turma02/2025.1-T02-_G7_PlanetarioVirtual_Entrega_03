"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getPosts, deletePost } from '@/services/api';
import type { Post, User } from '@/services/api';
import { PostList } from '@/components/forum/PostList';
import { CreatePostForm } from '@/components/forum/CreatePostForm';
import { toast } from 'react-toastify';

export default function HomePage() {
  const { user } = useAuth(); 
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const carregarPostagens = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const postagensRecebidas = await getPosts();
        setPosts(postagensRecebidas);

        if (postagensRecebidas.length === 0) {
          toast.info('Nenhuma postagem encontrada no momento. Seja o primeiro a postar!');
        } else {
          toast.success('Postagens carregadas!');
        }
      } catch (erro) {
        const msgErro = erro instanceof Error ? erro.message : 'Falha desconhecida ao carregar postagens.';
        console.error("HomePage: Erro ao buscar postagens:", msgErro);
        setErrorMessage(msgErro); 
        toast.error(`Erro ao carregar o feed: ${msgErro}`); 
        setPosts([]); 
      } finally {
        setIsLoading(false);
      }
    };
    carregarPostagens();
  }, []);

  const handleCreatePost = (postText: string) => {
    if (!user) {
      toast.warn('Você precisa estar logado para criar uma postagem.');
      return;
    }
    // Lógica para criar post (atualmente local, não chama API)
    // No futuro, você chamaria uma função como `createPostAPI(postText, user.id)`
    const newPost: Post = {
      id: Date.now(), // ID temporário, a API geraria o ID real
      texto: postText,
      autor: user, // Usuário obtido do contexto de autenticação
      dataCriacao: new Date().toISOString(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]); // Adiciona o novo post no início da lista
    toast.success('Postagem criada (localmente) com sucesso!');
  };

  const handleDeletePost = async (postId: number) => {
    // A função deletePost em services/api.ts ainda é mockada.
    // No futuro, ela faria uma chamada `DELETE` para a API.
    try {
      // Simula uma confirmação (você pode usar um modal mais robusto)
      // const querDeletar = window.confirm("Tem certeza que deseja deletar esta postagem?");
      // if (!querDeletar) return;

      const resultado = await deletePost(postId); // Chama a função (mockada)
      if (resultado.success) {
        setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        toast.success('Postagem deletada com sucesso!');
      } else {
        toast.error('Não foi possível deletar a postagem (operação mockada falhou).');
      }
    } catch (erro) {
      const msgErro = erro instanceof Error ? erro.message : 'Erro desconhecido.';
      toast.error(`Falha ao deletar postagem: ${msgErro}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Feed Principal</h1>

      {user && <CreatePostForm onPostSubmit={handleCreatePost} />}

      {isLoading && (
        <p className="text-center text-gray-400 mt-6">Carregando postagens...</p>
      )}

      {!isLoading && errorMessage && (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-md mt-6">
          <p><strong>Oops! Algo deu errado ao carregar o feed:</strong></p>
          <p>{errorMessage}</p>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <PostList posts={posts} onDeletePost={handleDeletePost} />
      )}
    </div>
  );
}
