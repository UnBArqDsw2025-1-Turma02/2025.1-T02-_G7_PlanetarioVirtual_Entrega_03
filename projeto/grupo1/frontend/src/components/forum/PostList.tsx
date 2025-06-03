// src/components/forum/PostList.tsx
"use client";

import type { Post } from '@/services/api';
import { PostItem } from './PostItem';
import { useState, useMemo } from 'react';
import {
  SortingStrategy,
  SortByDateDescendingStrategy,
  SortByDateAscendingStrategy,
  SortByCreatorAscendingStrategy,
  SortByCreatorDescendingStrategy
  // Importe outras estratégias que criar
} from '../../app/lib/sortingStrategies'; // Certifique-se que o caminho está correto

type PostListProps = {
  posts: Post[]; // Usando 'posts' como nome da prop, conforme seu código original
  onDeletePost: (postId: number) => void;
};

// Mapeamento das chaves para instâncias das estratégias
const sortingOptions: Record<string, SortingStrategy> = {
  dateDesc: new SortByDateDescendingStrategy(),
  dateAsc: new SortByDateAscendingStrategy(),
  creatorAsc: new SortByCreatorAscendingStrategy(),
  creatorDesc: new SortByCreatorDescendingStrategy(),
};

type SortingOptionKey = keyof typeof sortingOptions;

export function PostList({ posts, onDeletePost }: PostListProps) {
  const [currentStrategyKey, setCurrentStrategyKey] = useState<SortingOptionKey>('dateDesc'); // Padrão: mais recentes

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStrategyKey(event.target.value as SortingOptionKey);
  };

  const sortedPosts = useMemo(() => {
    // Garante que 'posts' é um array e não está vazio antes de tentar ordenar
    if (!Array.isArray(posts) || posts.length === 0) {
      return []; // Retorna array vazio se 'posts' não for um array ou estiver vazio
    }

    const strategy = sortingOptions[currentStrategyKey];
    if (strategy) {
      // As estratégias de ordenação criam um novo array ordenado ([...posts])
      return strategy.sort(posts);
    }
    // Fallback: retorna os posts originais se uma estratégia não for encontrada (improvável)
    return posts;
  }, [posts, currentStrategyKey]); // Dependências: re-executa se 'posts' ou 'currentStrategyKey' mudar

  // Verifica se, após a tentativa de ordenação, há posts para exibir.
  // Isso cobre o caso de 'posts' ser inicialmente vazio.
  if (sortedPosts.length === 0) {
    return <p className="text-gray-400 text-center py-10">Nenhuma postagem para exibir.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        {/* Pode adicionar um título se quiser, como "Postagens" */}
        {/* <h2 className="text-2xl font-semibold text-white">Postagens</h2> */}
        <div className="flex-grow"></div> {/* Espaçador para empurrar o select para a direita se não houver título */}
        <div className="flex items-center">
          <label htmlFor="sort-posts" className="text-gray-300 mr-2 text-sm font-medium">
            Ordenar por:
          </label>
          <select
            id="sort-posts"
            value={currentStrategyKey}
            onChange={handleSortChange}
            className="bg-gray-700 text-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="dateDesc">Data (Mais recentes)</option>
            <option value="dateAsc">Data (Mais antigos)</option>
            <option value="creatorAsc">Criador (A-Z)</option>
            <option value="creatorDesc">Criador (Z-A)</option>
          </select>
        </div>
      </div>

      {sortedPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
}