"use client"; 

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

import { getPostsByUserId, deletePost } from '@/services/api'; 
import type { Post, Comment } from '@/services/api'; 

import { PostList } from '@/components/forum/PostList';
import { CreatePostForm } from '@/components/forum/CreatePostForm';
import Link from 'next/link';

export default function MeuPerfilPage() {
  const { user } = useAuth(); 
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMyPosts([]); 
      setIsLoading(false);
      return;
    }
    
    const fetchMyPosts = async () => {
      setIsLoading(true);
      const posts = await getPostsByUserId(user.id);
      
      const sortedPosts = [...posts].sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
      setMyPosts(sortedPosts);
      setIsLoading(false);
    };

    fetchMyPosts();
  }, [user]); 

  const handleCreatePost = (postText: string) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now(),
      texto: postText,
      autor: user,
      dataCriacao: new Date().toISOString(),
    };
    setMyPosts(prevPosts => [newPost, ...prevPosts]);
  };

  
  const handleDeletePost = async (postId: number) => {
    
    try {
      await deletePost(postId); 
      setMyPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
    } catch (error) {
      console.error("Erro ao deletar post (mock) no Meu Perfil:", error);
      alert("Falha ao deletar a postagem do seu perfil.");
    }
  };
  
  if (!user) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-white">Acesso Negado</h1>
        <p className="text-gray-400 mt-2">
          Você precisa fazer login para acessar esta página.
        </p>
        <Link href="/login" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          Ir para Login
        </Link>
      </div>
    );
  }
  
  if (isLoading) {
    return <p className="text-center text-gray-400 p-10">Carregando seu perfil...</p>;
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
      <p className="text-lg text-blue-400 mb-8">Bem-vindo(a) de volta, {user.nome}!</p>
      
      <CreatePostForm onPostSubmit={handleCreatePost} />
      
      <h2 className="text-2xl font-semibold text-white mt-10 mb-6">Minhas Postagens</h2>
      
      {myPosts.length > 0 ? (
        <PostList posts={myPosts} onDeletePost={handleDeletePost} />
      ) : (
        <p className="text-center text-gray-500 bg-gray-800 p-8 rounded-lg">
          Você ainda não fez nenhuma postagem. Crie uma acima!
        </p>
      )}
    </div>
  );
}