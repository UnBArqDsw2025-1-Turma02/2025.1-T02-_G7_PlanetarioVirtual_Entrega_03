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

    const allPosts = await getPosts(); 
    const basicPostDetails = allPosts.find(p => p.id === postId);

    if (!basicPostDetails) {
      
      fetchError = "Postagem não encontrada na listagem inicial.";
      
    } else {
      
      const contentAndComments = await fetchPostContentAndComments(postId);

      if (contentAndComments) {
        finalPostData = {
          id: basicPostDetails.id,
          texto: contentAndComments.textoPost, 
          autor: basicPostDetails.autor,       
          dataCriacao: basicPostDetails.dataCriacao, 
          comentarios: contentAndComments.comentarios,
        };
      } else {
        fetchError = "Não foi possível carregar os comentários e detalhes finais da postagem.";
      }
    }
  } catch (error) {
    console.error(`PostDetailPage: Erro ao construir dados para post ${postId}`, error);
    fetchError = error instanceof Error ? error.message : "Erro desconhecido ao carregar dados da postagem.";
  }

  
  if (!finalPostData) {
    
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
