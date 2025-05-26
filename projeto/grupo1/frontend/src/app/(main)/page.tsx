"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { initialPosts, initialUsers } from '@/services/api';
import type { Post, Comment } from '@/services/api';

import { PostList } from '@/components/forum/PostList';
import { CreatePostForm } from '@/components/forum/CreatePostForm';

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (postText: string) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now(),
      texto: postText,
      autor: { id: user.id, nome: user.nome, tipo: user.tipo },
      comentarios: [],
      dataCriacao: new Date().toISOString(), 
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  const handleCreateComment = (postId: number, commentText: string) => {
    if (!user) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    
    const newComment: Comment = {
      id: Date.now(),
      texto: commentText,
      autor: { id: user.id, nome: user.nome, tipo: user.tipo },
      dataCriacao: new Date().toISOString(),
    };

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, comentarios: [newComment, ...post.comentarios] };
        }
        return post;
      })
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Feed Principal</h1>

      {user ? (
        <CreatePostForm onPostSubmit={handleCreatePost} />
      ) : (
        <p className="text-center text-blue-400 mb-8">
          Faça login para criar postagens e interagir com a comunidade!
        </p>
      )}

      {isLoading ? (
        <p className="text-center text-gray-400">Carregando postagens...</p>
      ) : (
        <PostList posts={posts} onCommentSubmit={handleCreateComment} />
      )}
    </div>
  );
}