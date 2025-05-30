const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


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

type ApiPostResponseItem = {
  id: number;
  conteudo: string;
  autor_id: number;
  nome_autor: string;
  data_criacao: string;
};

export const initialUsers: User[] = [
  { id: 1, nome: 'Alice Comum', tipo: 'comum' },
  { id: 2, nome: 'Bob Moderador', tipo: 'moderador' },
  { id: 3, nome: 'Charlie Curioso', tipo: 'comum' },
  { id: 4, nome: 'Diana Astrônoma', tipo: 'comum' },
  { id: 5, nome: 'Eva Cientista', tipo: 'comum' },
  { id: 6, nome: 'Franco Admin', tipo: 'moderador' },
];

export const getPostById = async (postId: number): Promise<PostWithComments | null> => {
  console.log(`API MOCK: Buscando postagem com ID: ${postId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));

  const post = initialPosts.find(p => p.id === postId) || null;
  console.log(`API MOCK: Postagem encontrada:`, post);
  return post;
};

export const getPosts = async (): Promise<Post[]> => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/postagens/`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Frontend: Erro na API ao buscar postagens - Status ${response.status}`, errorData);
      throw new Error(`Erro ${response.status} ao buscar postagens. Tente novamente mais tarde.`);
    }
    const apiPosts: ApiPostResponseItem[] = await response.json();
    const posts: Post[] = apiPosts.map(apiPost => {
      let autorObjeto = initialUsers.find(u => u.id === apiPost.autor_id);
      if (!autorObjeto) {

        autorObjeto = {
          id: apiPost.autor_id,
          nome: apiPost.nome_autor,
          tipo: 'comum',
        };
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
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Não foi possível conectar à API de postagens. Verifique sua conexão.");
  }
};

const initialPosts: PostWithComments[] = [
  {
    id: 1,
    texto: "Olá, pessoal! Estou animado para participar deste fórum.",
    autor: { id: 1, nome: "Alice Comum", tipo: "comum" },
    dataCriacao: "2023-10-01T10:00:00Z",
    comentarios: [
      {
        id: 1,
        texto: "Bem-vinda, Alice! Estamos felizes em tê-la aqui.",
        autor: { id: 2, nome: "Bob Moderador", tipo: "moderador" },
        dataCriacao: "2023-10-01T10:05:00Z",
      },
    ],
  },
];

export const getUsers = async (): Promise<User[]> => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar usuários.`);
    }
    const usersData = await response.json();
    console.log(`API: ${usersData.length} usuários encontrados.`);
    return usersData;

  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Erro ')) {
      throw error;
    }
    throw new Error("Não foi possível conectar à API de usuários.");
  }
};


export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  console.log(`API MOCK: Buscando postagens para o usuário ID: ${userId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));

  const userPosts = initialPosts.filter(p => p.autor.id === userId);
  const sortedPosts = [...userPosts].sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());

  console.log(`API MOCK: Encontradas ${sortedPosts.length} postagens para o usuário ID: ${userId}.`);
  return sortedPosts;
};

export const createComment = async (postId: number, author: User, text: string): Promise<Comment> => {
  console.log(`API MOCK: Criando comentário para o post ID: ${postId}...`);
  await new Promise(resolve => setTimeout(resolve, 400));

  const newComment: Comment = {
    id: Date.now(),
    texto: text,
    autor: author,
    dataCriacao: new Date().toISOString(),
  };
  console.log(`API MOCK: Comentário criado com ID: ${newComment.id}`);
  return newComment;
};

export const deletePost = async (postId: number): Promise<{ success: boolean }> => {
  console.log(`API MOCK: Deletando postagem com ID: ${postId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`API MOCK: Postagem ${postId} deletada com sucesso.`);
  return { success: true };
};

export const deleteComment = async (commentId: number): Promise<{ success: boolean }> => {
  console.log(`API MOCK: Deletando comentário com ID: ${commentId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`API MOCK: Comentário ${commentId} deletado com sucesso.`);
  return { success: true };
};
