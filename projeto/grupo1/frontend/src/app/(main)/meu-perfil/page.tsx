"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getPostsByUserId, createPostAPI, deletePostAPI } from '@/services/api';
import type { Post } from '@/services/api'; 
import { PostList } from '@/components/forum/PostList';
import { CreatePostForm } from '@/components/forum/CreatePostForm';
import Link from 'next/link';
import { toast } from 'react-toastify'; 

export default function MeuPerfilPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!user) {
      setMyPosts([]);
      setIsLoading(false);
      return;
    }

    const fetchMyPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const posts = await getPostsByUserId(user.id); 
        
        
        const sortedPosts = [...posts].sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
        setMyPosts(sortedPosts);
        if (sortedPosts.length === 0) {
          toast.info("Você ainda não criou nenhuma postagem.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Falha ao carregar suas postagens.";
        console.error("MeuPerfilPage: Erro ao buscar postagens do usuário:", errorMessage);
        setError(errorMessage);
        toast.error(`Erro ao carregar suas postagens: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [user]);

  const handleCreatePost = async (postText: string) => {
    if (!user) {
      toast.warn("Você precisa estar logado para criar uma postagem.");
      return;
    }
    if (!postText.trim()) {
      toast.warn("A postagem não pode estar vazia.");
      return;
    }

    try {
      const novoPostDaApi = await createPostAPI(postText, user.id);
      
      setMyPosts(prevPosts => [novoPostDaApi, ...prevPosts]
        .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())); 
      toast.success("Postagem criada com sucesso!");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Falha desconhecida ao criar postagem.";
      console.error("Erro ao criar postagem via API no Meu Perfil:", error);
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
        setMyPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        toast.success(resultado.message || "Postagem deletada com sucesso!");
      } else {
        toast.error(resultado.message || "Não foi possível deletar a postagem.");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido ao tentar deletar.";
      console.error("Erro ao deletar post via API no Meu Perfil:", error);
      toast.error(`Falha ao deletar a postagem: ${msg}`);
    }
  };

  if (!user && !isLoading) { 
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-white">Acesso Negado</h1>
        <p className="text-gray-400 mt-2">
          Você precisa fazer login para acessar esta página.
        </p>
        <Link href="/login" className="mt-6 inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg">
          Ir para Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-center text-gray-400 p-10">Carregando seu perfil e postagens...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
      {user && <p className="text-lg text-sky-400 mb-8">Bem-vindo(a) de volta, {user.nome}!</p>}
      
      {user && <CreatePostForm onPostSubmit={handleCreatePost} />}
      
      <h2 className="text-2xl font-semibold text-white mt-10 mb-6">Minhas Postagens</h2>
      
      {error && (
         <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-md my-4">{error}</p>
      )}

      {!error && myPosts.length > 0 ? (
        <PostList posts={myPosts} onDeletePost={handleDeletePost} />
      ) : (
        !error && <p className="text-center text-gray-500 bg-gray-800 p-8 rounded-lg">
          Você ainda não fez nenhuma postagem. Crie uma acima!
        </p>
      )}
    </div>
  );
}
