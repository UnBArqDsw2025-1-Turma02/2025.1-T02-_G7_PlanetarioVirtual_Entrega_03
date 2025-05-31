import { getPosts, fetchPostContentAndComments, Post, PostWithComments } from '@/services/api';
import { PostDetailView } from '@/components/forum/PostDetailView';

type PostDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = Number(params.id);
  let finalPostData: PostWithComments | null = null;
  let fetchError: string | null = null;

  try {
    // Etapa 1: Obter todos os posts para encontrar os detalhes básicos do post desejado
    // (incluindo autor e dataCriacao que a API de comentários não fornece para o post principal)
    // Em uma aplicação maior, você poderia ter um endpoint /api/postagens/{id}
    // que retorne apenas os dados do post principal. Por enquanto, filtramos da lista.
    const allPosts = await getPosts(); // getPosts já trata seus próprios erros de fetch
    const basicPostDetails = allPosts.find(p => p.id === postId);

    if (!basicPostDetails) {
      // Se o post básico não for encontrado na lista (pode ter sido deletado ou ID inválido)
      fetchError = "Postagem não encontrada na listagem inicial.";
      // Não precisa de `toast` aqui, pois é um Server Component. A UI tratará `finalPostData` como null.
    } else {
      // Etapa 2: Buscar o conteúdo atualizado do post e seus comentários
      const contentAndComments = await fetchPostContentAndComments(postId);

      if (contentAndComments) {
        finalPostData = {
          id: basicPostDetails.id,
          texto: contentAndComments.textoPost, // Usa o texto mais recente da API de comentários
          autor: basicPostDetails.autor,       // Usa o autor da listagem (confiável)
          dataCriacao: basicPostDetails.dataCriacao, // Usa a data da listagem (confiável)
          comentarios: contentAndComments.comentarios,
        };
      } else {
        // Se contentAndComments for null (ex: 404 na API de comentários),
        // podemos ainda mostrar o post básico sem comentários, ou tratar como erro.
        // Por ora, se não conseguir comentários, consideramos um erro para a visualização completa.
        fetchError = "Não foi possível carregar os comentários e detalhes finais da postagem.";
      }
    }
  } catch (error) {
    console.error(`PostDetailPage: Erro ao construir dados para post ${postId}`, error);
    fetchError = error instanceof Error ? error.message : "Erro desconhecido ao carregar dados da postagem.";
  }

  // Renderiza a view do cliente com os dados finais ou lida com o erro/não encontrado
  if (!finalPostData) {
    // Se finalPostData for null, significa que o post não foi encontrado ou houve um erro crítico.
    // O PostDetailView pode ser adaptado para mostrar o fetchError se ele for passado.
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-white">
          {fetchError ? "Erro ao Carregar Postagem" : "Postagem não encontrada"}
        </h1>
        {fetchError && <p className="text-red-400 mt-2">{fetchError}</p>}
        {!fetchError && <p className="text-gray-400 mt-2">O link que você seguiu pode estar quebrado ou a postagem foi removida.</p>}
      </div>
    );
  }

  return <PostDetailView initialPost={finalPostData} />;
}
