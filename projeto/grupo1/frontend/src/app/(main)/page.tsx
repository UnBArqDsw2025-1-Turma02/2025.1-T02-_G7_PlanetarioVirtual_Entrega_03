"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { initialPosts } from '@/services/api';
import type { Post } from '@/services/api';
import { deletePost } from '@/services/api';
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
      autor: user,
      comentarios: [],
      dataCriacao: new Date().toISOString(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleDeletePost = async (postId: number) => {
    await deletePost(postId);
    setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Feed Principal</h1>

      {user && <CreatePostForm onPostSubmit={handleCreatePost} />}

      {isLoading ? (
        <p className="text-center text-gray-400">Carregando postagens...</p>
      ) : (
        <PostList posts={posts} onDeletePost={handleDeletePost} />
      )}
    </div>
  );
}