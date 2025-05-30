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
  comentarios: Comment[];
  dataCriacao: string;
};


export const initialUsers: User[] = [
  { id: 1, nome: 'Alice Comum', tipo: 'comum' },
  { id: 2, nome: 'Bob Moderador', tipo: 'moderador' },
  { id: 3, nome: 'Charlie Curioso', tipo: 'comum' },
  { id: 4, nome: 'Diana Astrônoma', tipo: 'comum' },
  { id: 5, nome: 'Eva Cientista', tipo: 'comum' },
  { id: 6, nome: 'Franco Admin', tipo: 'moderador' },
];

export const initialPosts: Post[] = [
  {
    id: 106,
    texto: 'Anúncio: Criamos uma nova seção no fórum dedicada à Astrofotografia! Compartilhem suas melhores fotos do céu noturno lá.',
    autor: initialUsers[5], 
    dataCriacao: new Date('2025-05-26T18:00:00Z').toISOString(),
    comentarios: [
       { id: 508, texto: 'Que ótima notícia! Já vou postar as minhas.', autor: initialUsers[0], dataCriacao: new Date('2025-05-26T18:05:00Z').toISOString() },
    ],
  },
  {
    id: 105,
    texto: 'Consegui tirar uma foto incrível da Lua Cheia ontem à noite. A cratera Tycho estava super visível. Alguém mais viu?',
    autor: initialUsers[3], 
    dataCriacao: new Date('2025-05-25T22:15:00Z').toISOString(),
    comentarios: [
       { id: 507, texto: 'Eu vi! Estava linda mesmo. Parabéns pela foto!', autor: initialUsers[4], dataCriacao: new Date('2025-05-26T09:10:00Z').toISOString() },
    ],
  },
  {
    id: 104,
    texto: 'As últimas imagens do Telescópio James Webb são de tirar o fôlego. A nebulosa de Carina nunca pareceu tão detalhada.',
    autor: initialUsers[4], 
    dataCriacao: new Date('2025-05-25T15:00:00Z').toISOString(),
    comentarios: [],
  },
  {
    id: 101,
    texto: 'Acabei de observar Júpiter com meu novo telescópio! As faixas de nuvens e as luas galileanas são incríveis de se ver.',
    autor: initialUsers[0], 
    dataCriacao: new Date('2025-05-24T21:30:00Z').toISOString(),
    comentarios: [
      { id: 501, texto: 'Que legal, Alice! Qual telescópio você usou?', autor: initialUsers[2], dataCriacao: new Date('2025-05-24T21:35:00Z').toISOString() },
      { id: 502, texto: 'Fantástico! Júpiter é o meu planeta favorito.', autor: initialUsers[1], dataCriacao: new Date('2025-05-24T21:40:00Z').toISOString() },
      { id: 505, texto: 'Também observei ontem, a Grande Mancha Vermelha estava bem nítida.', autor: initialUsers[3], dataCriacao: new Date('2025-05-25T10:00:00Z').toISOString() },
    ],
  },
  {
    id: 103,
    texto: 'Lembrete amigável do moderador: vamos manter as discussões respeitosas e focadas em astronomia. Obrigado a todos!',
    autor: initialUsers[1], 
    dataCriacao: new Date('2025-05-24T11:00:00Z').toISOString(),
    comentarios: [],
  },
  {
    id: 102,
    texto: 'Alguém tem dicas de livros sobre a teoria da relatividade para iniciantes? É um assunto que sempre me fascinou.',
    autor: initialUsers[2], 
    dataCriacao: new Date('2025-05-23T19:45:00Z').toISOString(),
    comentarios: [
      { id: 506, texto: '"Uma Breve História do Tempo" de Stephen Hawking é um clássico, mas pode ser denso. Tente "Relatividade" de Albert Einstein, o próprio livro dele é surpreendentemente acessível.', autor: initialUsers[4], dataCriacao: new Date('2025-05-24T09:00:00Z').toISOString() },
    ],
  },
];



export const getPosts = async (): Promise<Post[]> => {
  console.log('API MOCK: Buscando todas as postagens...');
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  const sortedPosts = [...initialPosts].sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
  console.log('API MOCK: Postagens retornadas.');
  return sortedPosts;
};

export const getPostById = async (id: number): Promise<Post | undefined> => {
  console.log(`API MOCK: Buscando postagem com ID: ${id}...`);
  await new Promise(resolve => setTimeout(resolve, 300));

  const post = initialPosts.find(p => p.id === id);
  return post;
};

export const getUsers = async (): Promise<User[]> => {
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
