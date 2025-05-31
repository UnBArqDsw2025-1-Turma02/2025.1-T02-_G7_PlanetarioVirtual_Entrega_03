"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getPosts, createPostAPI, deletePostAPI } from '@/services/api';
import type { Post, User } from '@/services/api';
import { PostList } from '@/components/forum/PostList';
import { CreatePostForm } from '@/components/forum/CreatePostForm';
import { toast } from 'react-toastify';

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const carregarPostagens = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const postagensRecebidas = await getPosts();
      setPosts(postagensRecebidas.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()));

      if (postagensRecebidas.length === 0) {
        toast.info('Nenhuma postagem encontrada no momento. Seja o primeiro a postar!');
      } else {
        console.log('Postagens carregadas via API.');
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

  useEffect(() => {
    carregarPostagens();
  }, []); 

  const handleCreatePost = async (postText: string) => {
    if (!user) {
      toast.warn('Você precisa estar logado para criar uma postagem.');
      return;
    }
    if (!postText.trim()) {
      toast.warn("A postagem não pode estar vazia.");
      return;
    }

    try {
      const novoPostDaApi = await createPostAPI(postText, user.id);
      setPosts(prevPosts => [novoPostDaApi, ...prevPosts]
        .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()));
      toast.success('Postagem criada com sucesso!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Falha desconhecida ao criar postagem.";
      console.error("Erro ao criar postagem via API na HomePage:", error);
      toast.error(`Falha ao criar a postagem: ${msg}`);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!user) {
      toast.warn("Você precisa estar logado para realizar esta ação.");
      return;
    }

    try {
      const resultado = await deletePostAPI(postId, user.id);
      if (resultado.success) {
        setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        toast.success(resultado.message || 'Postagem deletada com sucesso!');
      } else {
        toast.error(resultado.message || 'Não foi possível deletar a postagem.');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro desconhecido ao tentar deletar.';
      console.error("Erro ao deletar post via API na HomePage:", error);
      toast.error(`Falha ao deletar postagem: ${msg}`);
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
