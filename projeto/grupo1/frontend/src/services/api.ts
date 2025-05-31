// URL base da API, configurada via variáveis de ambiente ou com fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// --- TIPOS ---
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

// --- TIPOS PARA RESPOSTAS DA API ---
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

// --- DADOS MOCKADOS ---
export const initialUsers: User[] = [
  { id: 1, nome: 'Alice Comum', tipo: 'comum' },
  { id: 2, nome: 'Bob Moderador', tipo: 'moderador' },
  { id: 3, nome: 'Charlie Curioso', tipo: 'comum' },
  { id: 4, nome: 'Diana Astrônoma', tipo: 'comum' },
  { id: 5, nome: 'Eva Cientista', tipo: 'comum' },
  { id: 6, nome: 'Franco Admin', tipo: 'moderador' },
];

// --- FUNÇÕES DE API ---

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
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        const textError = await response.text();
        errorMessage = textError || response.statusText || errorMessage;
      }
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

// ATUALIZADA: Função para deletar um comentário via API
export const deleteCommentAPI = async (commentId: number, userId: number): Promise<{ success: boolean; message?: string }> => {
  const endpoint = `${API_BASE_URL}/api/comentarios/${commentId}/${userId}`;
  console.log(`Frontend: Deletando comentário ${commentId} pelo usuário ${userId} em ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        // Adicione outros cabeçalhos aqui se necessário (ex: Authorization para JWT)
      },
    });

    if (!response.ok) {
      // Tenta extrair uma mensagem de erro do corpo da resposta
      let errorMessage = `Erro ${response.status} ao deletar o comentário.`;
      try {
        const errorData = await response.json(); // A API pode retornar um JSON com 'detail' ou 'message'
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        // Se não for JSON, tenta pegar o texto da resposta
        const textError = await response.text();
        errorMessage = textError || response.statusText || errorMessage; // Fallback para statusText
      }
      console.error(`Frontend: Erro na API ao deletar comentário - Status ${response.status}`, errorMessage);
      return { success: false, message: errorMessage }; // Retorna sucesso false e a mensagem de erro
    }

    // Se a API retornar 204 (No Content) ou um JSON de sucesso
    // Algumas APIs DELETE retornam 204 e corpo vazio, outras podem retornar um JSON.
    // Se retornar JSON, você pode querer processá-lo aqui.
    // Ex: const data = await response.json();
    console.log(`Frontend: Comentário ${commentId} deletado com sucesso via API.`);
    return { success: true };

  } catch (error) {
    console.error("Frontend: Falha crítica ao deletar comentário.", error);
    const message = error instanceof Error ? error.message : "Não foi possível conectar à API para deletar o comentário.";
    return { success: false, message };
  }
};


// Funções mockadas restantes
export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  console.log(`API MOCK: Buscando postagens para o usuário ID: ${userId}...`);
  await new Promise(resolve => setTimeout(resolve, 300));
  // Simula a filtragem de posts mockados
  return [];
};

export const deletePost = async (postId: number): Promise<{ success: boolean }> => {
  console.log(`API MOCK: Deletando postagem com ID: ${postId}...`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};
