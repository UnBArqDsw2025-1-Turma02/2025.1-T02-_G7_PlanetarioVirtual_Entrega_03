// src/lib/sortingStrategies.ts
import type { Post } from '@/services/api'; // Certifique-se que o tipo Post está correto e importado

// Interface da Strategy
export interface SortingStrategy {
  sort(posts: Post[]): Post[];
}

// Strategies Concretas

// Ordenar por Data (Mais recentes primeiro)
export class SortByDateDescendingStrategy implements SortingStrategy {
  sort(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
  }
}

// Ordenar por Data (Mais antigos primeiro)
export class SortByDateAscendingStrategy implements SortingStrategy {
  sort(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime());
  }
}

// Ordenar por Criador (Nome A-Z)
export class SortByCreatorAscendingStrategy implements SortingStrategy {
  sort(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => a.autor.nome.localeCompare(b.autor.nome));
  }
}

// Ordenar por Criador (Nome Z-A)
export class SortByCreatorDescendingStrategy implements SortingStrategy {
  sort(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => b.autor.nome.localeCompare(a.autor.nome));
  }
}