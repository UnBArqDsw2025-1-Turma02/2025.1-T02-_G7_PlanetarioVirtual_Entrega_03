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

// Para um comentário individual na resposta da API ao buscar detalhes do post
type ApiSinglePostCommentItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  postagem_id: number;
  data_criacao: string;
  nome_autor: string;
};

// Para a resposta completa da API /api/postagens/{id_post}/comentarios
type ApiPostAndCommentsResponse = {
  conteudo_post: string;
  postagem_id: number;
  numero_comentarios: number;
  comentarios: ApiSinglePostCommentItem[];
};

// Tipo para a resposta da API ao CRIAR um novo comentário
// Assumindo que a API retorna o comentário criado com uma estrutura similar
type ApiCreatedCommentResponse = {
  id: number; // ID do novo comentário
  conteudo: string;
  autor_id: number;
  postagem_id: number; // ID do post ao qual o comentário pertence
  data_criacao: string; // String ISO da data de criação
  nome_autor: string; // Nome do autor (pode vir da API ou buscamos nos mocks)
};


// --- DADOS MOCKADOS (Usados como fallback ou para encontrar detalhes do autor) ---
export const initialUsers: User[] = [
  { id: 1, nome: 'Alice Comum', tipo: 'comum' },
  { id: 2, nome: 'Bob Moderador', tipo: 'moderador' },
  { id: 3, nome: 'Charlie Curioso', tipo: 'comum' },
  { id: 4, nome: 'Diana Astrônoma', tipo: 'comum' },
  { id: 5, nome: 'Eva Cientista', tipo: 'comum' },
  { id: 6, nome: 'Franco Admin', tipo: 'moderador' },
];

const MOCK_INITIAL_POSTS_WITH_COMMENTS: PostWithComments[] = [
  {
    id: 1,
    texto: "Olá, pessoal! Estou animado para participar deste fórum.",
    autor: initialUsers.find(u=> u.id === 1)!,
    dataCriacao: "2023-10-01T10:00:00Z",
    comentarios: [
      {
        id: 1,
        texto: "Bem-vinda, Alice! Estamos felizes em tê-la aqui.",
        autor: initialUsers.find(u=> u.id === 2)!,
        dataCriacao: "2023-10-01T10:05:00Z",
      },
    ],
  },
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

// ATUALIZADA: Função para criar um comentário via API
export const createCommentAPI = async (postId: number, texto: string, autorId: number): Promise<Comment> => {
  // A rota informada é /api/comentarios/{id_post}
  // O prefixo /api já está em API_BASE_URL se você o configurou assim no backend FastAPI
  // Se o prefixo /api for global para todos os routers no FastAPI, e o router de comentários for só /comentarios/{id_post}
  // então o endpoint abaixo está correto.
  // Se o router de comentários tiver seu próprio prefixo, ajuste conforme necessário.
  const endpoint = `${API_BASE_URL}/api/comentarios/${postId}`; // Endpoint para criar comentário

  console.log(`Frontend: Criando comentário para o post ${postId} em ${endpoint}`);

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
      let errorMessage = `Erro ${response.status} ao criar o comentário.`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        const textError = await response.text();
        errorMessage = textError || response.statusText || errorMessage;
      }
      console.error(`Frontend: Erro na API ao criar comentário - Status ${response.status}`, errorMessage);
      throw new Error(errorMessage);
    }

    const createdApiComment: ApiCreatedCommentResponse = await response.json();
    console.log("Frontend: Comentário criado via API:", createdApiComment);

    let autorObjeto = initialUsers.find(u => u.id === createdApiComment.autor_id);
    if (!autorObjeto) {
      const nomeAutorDaApi = createdApiComment.nome_autor || "Autor Desconhecido";
      autorObjeto = { id: createdApiComment.autor_id, nome: nomeAutorDaApi, tipo: 'comum' };
    }

    const novoComentario: Comment = {
      id: createdApiComment.id,
      texto: createdApiComment.conteudo,
      autor: autorObjeto,
      dataCriacao: new Date(createdApiComment.data_criacao).toISOString(),
    };

    return novoComentario;

  } catch (error) {
    console.error("Frontend: Falha crítica ao criar comentário.", error);
    if (error instanceof Error) throw error;
    throw new Error("Não foi possível conectar à API para criar o comentário.");
  }
};


// Funções mockadas restantes (podem ser adaptadas no futuro)
export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  console.log(`API MOCK: Buscando postagens para o usuário ID: ${userId}...`);
  await new Promise(resolve => setTimeout(resolve, 300));
  const userPosts = MOCK_INITIAL_POSTS_WITH_COMMENTS.filter(p => p.autor.id === userId).map(p => ({
    id: p.id,
    texto: p.texto,
    autor: p.autor,
    dataCriacao: p.dataCriacao,
  }));
  return userPosts.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
};

export const deletePost = async (postId: number): Promise<{ success: boolean }> => {
  console.log(`API MOCK: Deletando postagem com ID: ${postId}...`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

export const deleteComment = async (commentId: number): Promise<{ success: boolean }> => {
  console.log(`API MOCK: Deletando comentário com ID: ${commentId}...`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};
