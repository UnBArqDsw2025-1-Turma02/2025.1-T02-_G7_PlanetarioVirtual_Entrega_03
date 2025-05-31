import { initialUsers } from './api';
import type {
  User,
  Post,
  Comment,
  PostWithComments,
  ApiListPostItem,
  ApiCreatedPostResponse,
  ApiSinglePostCommentItem,
  ApiCreatedCommentResponse,
  ApiPostAndCommentsResponse
} from './api';

function findOrCreateUser(apiAutorId: number, apiNomeAutor?: string, defaultTipo: 'comum' | 'moderador' = 'comum'): User {
  let user = initialUsers.find(u => u.id === apiAutorId);
  if (!user) {
    user = {
      id: apiAutorId,
      nome: apiNomeAutor || "Autor Desconhecido",
      tipo: defaultTipo
    };
  }
  return user;
}

export class PostAPIAdapter {
  static toPost(apiPost: ApiListPostItem): Post {
    const autor = findOrCreateUser(apiPost.autor_id, apiPost.nome_autor);
    return {
      id: apiPost.id,
      texto: apiPost.conteudo,
      autor: autor,
      dataCriacao: new Date(apiPost.data_criacao).toISOString(),
    };
  }

  static toCreatedPost(apiPost: ApiCreatedPostResponse): Post {
    const autor = findOrCreateUser(apiPost.autor_id, apiPost.nome_autor);
    return {
      id: apiPost.id,
      texto: apiPost.conteudo,
      autor: autor,
      dataCriacao: new Date(apiPost.data_criacao).toISOString(),
    };
  }
}

export class CommentAPIAdapter {
  static toComment(apiComment: ApiSinglePostCommentItem): Comment {
    const autor = findOrCreateUser(apiComment.autor_id, apiComment.nome_autor);
    return {
      id: apiComment.id,
      texto: apiComment.conteudo,
      autor: autor,
      dataCriacao: new Date(apiComment.data_criacao).toISOString(),
    };
  }

  static toCreatedComment(apiComment: ApiCreatedCommentResponse): Comment {
    const autor = findOrCreateUser(apiComment.autor_id, apiComment.nome_autor);
    return {
      id: apiComment.id,
      texto: apiComment.conteudo,
      autor: autor,
      dataCriacao: new Date(apiComment.data_criacao).toISOString(),
    };
  }
}

export class PostWithCommentsAPIAdapter {
  static toPostWithComments(
    apiResponse: ApiPostAndCommentsResponse,
    basePostDetails: { autor: User; dataCriacao: string }
  ): PostWithComments {
    const comentariosFormatados: Comment[] = apiResponse.comentarios
      .map(apiComment => CommentAPIAdapter.toComment(apiComment))
      .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());

    return {
      id: apiResponse.postagem_id,
      texto: apiResponse.conteudo_post,
      autor: basePostDetails.autor,
      dataCriacao: basePostDetails.dataCriacao,
      comentarios: comentariosFormatados,
    };
  }
}
