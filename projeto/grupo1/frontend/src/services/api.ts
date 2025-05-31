const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

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


type ApiListPostItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  nome_autor: string;
  data_criacao: string;
};

type ApiSinglePostCommentItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  postagem_id: number;
  data_criacao: string;
  nome_autor: string;
};

type ApiPostAndCommentsResponse = {
  conteudo_post: string;
  postagem_id: number;
  numero_comentarios: number;
  comentarios: ApiSinglePostCommentItem[];
};

type ApiCreatedCommentResponse = {
  id: number;
  conteudo: string;
  autor_id: number;
  postagem_id: number;
  data_criacao: string;
  nome_autor: string;
};


type ApiCreatedPostResponse = {
  id: number; 
  conteudo: string;
  autor_id: number;
  data_criacao: string; 
  nome_autor: string; 
};

export const initialUsers: User[] = [
  { id: 1, nome: 'Alice Comum', tipo: 'comum' },
  { id: 2, nome: 'Bob Moderador', tipo: 'moderador' },
  
];


export const getPosts = async (): Promise<Post[]> => {
  const endpoint = `${API_BASE_URL}/api/postagens/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Erro ${response.status} ao buscar postagens: ${errorData}`);
    }
    const apiPosts: ApiListPostItem[] = await response.json();
    const posts: Post[] = apiPosts.map(apiPost => {
      let autorObjeto = initialUsers.find(u => u.id === apiPost.autor_id);
      if (!autorObjeto) {
        autorObjeto = { id: apiPost.autor_id, nome: apiPost.nome_autor, tipo: 'comum' };
      }
      return {
        id: apiPost.id,
        texto: apiPost.conteudo,
        autor: autorObjeto,
        dataCriacao: new Date(apiPost.data_criacao).toISOString(),
      };
    });
    return posts;
  } catch (error) {
    console.error("Frontend: Falha crítica ao buscar postagens.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API de postagens.");
  }
};

export const fetchPostContentAndComments = async (postId: number): Promise<{ textoPost: string; comentarios: Comment[] } | null> => {
  const endpoint = `${API_BASE_URL}/api/postagens/${postId}/comentarios`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      if (response.status === 404) return null;
      const errorData = await response.text();
      throw new Error(`Erro ${response.status} ao buscar conteúdo e comentários do post ${postId}: ${errorData}`);
    }
    const apiData: ApiPostAndCommentsResponse = await response.json();
    const comentariosFormatados: Comment[] = apiData.comentarios.map(apiComment => {
      let autorComentario = initialUsers.find(u => u.id === apiComment.autor_id);
      if (!autorComentario) {
        autorComentario = { id: apiComment.autor_id, nome: apiComment.nome_autor, tipo: 'comum' };
      }
      return {
        id: apiComment.id,
        texto: apiComment.conteudo,
        autor: autorComentario,
        dataCriacao: new Date(apiComment.data_criacao).toISOString(),
      };
    });
    return {
      textoPost: apiData.conteudo_post,
      comentarios: comentariosFormatados.sort((a,b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()),
    };
  } catch (error) {
    console.error(`Frontend: Falha crítica ao buscar conteúdo e comentários do post ${postId}.`, error);
    if (error instanceof Error) throw error;
    throw new Error(`Não foi possível conectar à API para buscar detalhes do post ${postId}.`);
  }
};

export const getUsers = async (): Promise<User[]> => {
  const endpoint = `${API_BASE_URL}/api/usuarios/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar usuários.`);
    }
    const usersData = await response.json();
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
    let autorObjeto = initialUsers.find(u => u.id === createdApiComment.autor_id);
    if (!autorObjeto) {
      const nomeAutorDaApi = createdApiComment.nome_autor || "Autor Desconhecido";
      autorObjeto = { id: createdApiComment.autor_id, nome: nomeAutorDaApi, tipo: 'comum' };
    }
    return {
      id: createdApiComment.id,
      texto: createdApiComment.conteudo,
      autor: autorObjeto,
      dataCriacao: new Date(createdApiComment.data_criacao).toISOString(),
    };
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
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        conteudo: texto,
        autor_id: autorId,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao criar o post.`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        const textError = await response.text();
        errorMessage = textError || response.statusText || errorMessage;
      }
      console.error(`Frontend: Erro na API ao criar post - Status ${response.status}`, errorMessage);
      throw new Error(errorMessage);
    }

    const createdApiPost: ApiCreatedPostResponse = await response.json();
    
    let autorObjeto = initialUsers.find(u => u.id === createdApiPost.autor_id);
    if (!autorObjeto) {
      autorObjeto = { id: createdApiPost.autor_id, nome: createdApiPost.nome_autor || "Autor Desconhecido", tipo: 'comum' };
    }

    const novoPost: Post = {
      id: createdApiPost.id,
      texto: createdApiPost.conteudo,
      autor: autorObjeto,
      dataCriacao: new Date(createdApiPost.data_criacao).toISOString(),
    };
    return novoPost;

  } catch (error) {
    console.error("Frontend: Falha crítica ao criar post.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API para criar o post.");
  }
};

export const deletePostAPI = async (postId: number, userId: number): Promise<{ success: boolean; message?: string }> => {
  const endpoint = `${API_BASE_URL}/api/postagens/${postId}/${userId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        
      },
    });

    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao deletar o post.`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        const textError = await response.text();
        errorMessage = textError || response.statusText || errorMessage;
      }
      console.error(`Frontend: Erro na API ao deletar post - Status ${response.status}`, errorMessage);
      return { success: false, message: errorMessage };
    }

    const data = await response.json();

    return { success: true, message: data.message };

  } catch (error) {
    console.error("Frontend: Falha crítica ao deletar post.", error);
    const message = error instanceof Error ? error.message : "Não foi possível conectar à API para deletar o post.";
    return { success: false, message };
  }
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  const allPosts = await getPosts(); 
  return allPosts.filter(p => p.autor.id === userId)
                 .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
};
