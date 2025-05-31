const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export type User = {
  id: number;
  nome: string;
  tipo: 'comum' | 'moderador';
};

export type Comment = {
  id: number;
  texto: string;
  autor: User;
  dataCriacao: string;
};

export type Post = {
  id: number;
  texto: string;
  autor: User;
  dataCriacao: string;
};

export type PostWithComments = Post & {
  comentarios: Comment[];
};

export type ApiListPostItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  nome_autor: string;
  data_criacao: string;
};

export type ApiSinglePostCommentItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  postagem_id: number;
  data_criacao: string;
  nome_autor: string;
};

export type ApiPostAndCommentsResponse = {
  conteudo_post: string;
  postagem_id: number;
  numero_comentarios: number;
  comentarios: ApiSinglePostCommentItem[];
};

export type ApiCreatedCommentResponse = {
  id: number;
  conteudo: string;
  autor_id: number;
  postagem_id: number;
  data_criacao: string;
  nome_autor: string;
};

export type ApiCreatedPostResponse = {
  id: number;
  conteudo: string;
  autor_id: number;
  data_criacao: string;
  nome_autor: string;
};

export const initialUsers: User[] = [
  { id: 1, nome: 'Milena Rocha', tipo: 'moderador' },
  { id: 2, nome: 'Rafael Pereira', tipo: 'comum' },
  { id: 3, nome: 'Letícia Santos', tipo: 'comum' },
  { id: 4, nome: 'Taynara Vitorino', tipo: 'comum' },
  { id: 5, nome: 'João Lucas', tipo: 'comum' },
  { id: 6, nome: 'João Pedro', tipo: 'comum' },
  { id: 7, nome: 'Manoel Moura', tipo: 'comum' },
  { id: 8, nome: 'Antônio Júnior', tipo: 'comum' },
  { id: 9, nome: 'Carlos Paz', tipo: 'comum' },
  { id: 10, nome: 'Raphaela Santos', tipo: 'comum' },
];

import {
  PostAPIAdapter,
  CommentAPIAdapter,
  PostWithCommentsAPIAdapter
} from './apiAdapters';



export const getPosts = async (): Promise<Post[]> => {
  const endpoint = `${API_BASE_URL}/api/postagens/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Erro ${response.status} ao buscar postagens: ${errorData}`);
    }
    const apiPosts: ApiListPostItem[] = await response.json();
    return apiPosts.map(PostAPIAdapter.toPost);
  } catch (error) {
    console.error("Frontend: Falha crítica ao buscar postagens.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API de postagens.");
  }
};

export const fetchPostWithComments = async (
  basicPostDetails: Post
): Promise<PostWithComments | null> => {
  const endpoint = `${API_BASE_URL}/api/postagens/${basicPostDetails.id}/comentarios`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      if (response.status === 404) return null;
      const errorData = await response.text();
      throw new Error(`Erro ${response.status} ao buscar comentários do post ${basicPostDetails.id}: ${errorData}`);
    }
    const apiData: ApiPostAndCommentsResponse = await response.json();
    return PostWithCommentsAPIAdapter.toPostWithComments(apiData, {
        autor: basicPostDetails.autor,
        dataCriacao: basicPostDetails.dataCriacao
    });
  } catch (error) {
    console.error(`Frontend: Falha crítica ao buscar comentários do post ${basicPostDetails.id}.`, error);
    if (error instanceof Error) throw error;
    throw new Error(`Não foi possível conectar à API para buscar detalhes do post ${basicPostDetails.id}.`);
  }
};

export const getUsers = async (): Promise<User[]> => {
  const endpoint = `${API_BASE_URL}/api/usuarios/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar usuários.`);
    }
    const usersData: User[] = await response.json();
    return usersData;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API de usuários.");
  }
};

export const createCommentAPI = async (postId: number, texto: string, autorId: number): Promise<Comment> => {
  const endpoint = `${API_BASE_URL}/api/comentarios/${postId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conteudo: texto, autor_id: autorId }),
    });
    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao criar o comentário.`;
      try { const errorData = await response.json(); errorMessage = errorData.detail || errorData.message || errorMessage; }
      catch (e) { const textError = await response.text(); errorMessage = textError || response.statusText || errorMessage; }
      throw new Error(errorMessage);
    }
    const createdApiComment: ApiCreatedCommentResponse = await response.json();
    return CommentAPIAdapter.toCreatedComment(createdApiComment);
  } catch (error) {
    console.error("Frontend: Falha crítica ao criar comentário.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API para criar o comentário.");
  }
};

export const deleteCommentAPI = async (commentId: number, userId: number): Promise<{ success: boolean; message?: string }> => {
  const endpoint = `${API_BASE_URL}/api/comentarios/${commentId}/${userId}`;
  try {
    const response = await fetch(endpoint, { method: 'DELETE' });
    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao deletar o comentário.`;
      try { const errorData = await response.json(); errorMessage = errorData.detail || errorData.message || errorMessage; }
      catch (e) { const textError = await response.text(); errorMessage = textError || response.statusText || errorMessage; }
      return { success: false, message: errorMessage };
    }
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível conectar à API para deletar o comentário.";
    return { success: false, message };
  }
};

export const createPostAPI = async (texto: string, autorId: number): Promise<Post> => {
  const endpoint = `${API_BASE_URL}/api/postagens/`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conteudo: texto, autor_id: autorId }),
    });
    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao criar o post.`;
      try { const errorData = await response.json(); errorMessage = errorData.detail || errorData.message || errorMessage; }
      catch (e) { const textError = await response.text(); errorMessage = textError || response.statusText || errorMessage; }
      throw new Error(errorMessage);
    }
    const createdApiPost: ApiCreatedPostResponse = await response.json();
    return PostAPIAdapter.toCreatedPost(createdApiPost);
  } catch (error) {
    console.error("Frontend: Falha crítica ao criar post.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API para criar o post.");
  }
};

export const deletePostAPI = async (postId: number, userId: number): Promise<{ success: boolean; message?: string }> => {
  const endpoint = `${API_BASE_URL}/api/postagens/${postId}/${userId}`;
  console.log(`Tentando deletar post ${postId} do usuário ${userId} no endpoint: ${endpoint}`);
  try {
    const response = await fetch(endpoint, { method: 'DELETE' });
    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao deletar o post.`;
      try { const errorData = await response.json(); errorMessage = errorData.detail || errorData.message || errorMessage; }
      catch (e) { const textError = await response.text(); errorMessage = textError || response.statusText || errorMessage; }
      return { success: false, message: errorMessage };
    }
    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível conectar à API para deletar o post.";
    return { success: false, message };
  }
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  const allPosts = await getPosts();
  return allPosts.filter(p => p.autor.id === userId)
                 .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
};
