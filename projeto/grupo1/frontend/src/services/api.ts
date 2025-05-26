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
];


export const initialPosts: Post[] = [
  {
    id: 101,
    texto: 'Acabei de observar Júpiter com meu novo telescópio! As faixas de nuvens e as luas galileanas são incríveis de se ver.',
    autor: initialUsers[0],
    dataCriacao: new Date(2025, 4, 26, 14, 30, 0).toISOString(), 
    comentarios: [
      { id: 501, texto: 'Que legal, Alice! Qual telescópio você usou?', autor: initialUsers[2], dataCriacao: new Date(2025, 4, 26, 14, 35, 0).toISOString() },
      { id: 502, texto: 'Fantástico! Júpiter é o meu planeta favorito.', autor: initialUsers[1], dataCriacao: new Date(2025, 4, 26, 14, 40, 0).toISOString() },
    ],
  },
  {
    id: 102,
    texto: 'Alguém tem dicas de livros sobre a teoria da relatividade para iniciantes? É um assunto que sempre me fascinou.',
    autor: initialUsers[2],
    dataCriacao: new Date(2025, 4, 25, 20, 0, 0).toISOString(), 
    comentarios: [],
  },
];