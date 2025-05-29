import { getPostById } from '@/services/api';
import { PostDetailView } from '@/components/forum/PostDetailView';

type PostDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = Number(params.id);
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-white">Postagem não encontrada</h1>
      </div>
    );
  }

  return <PostDetailView initialPost={post} />;
}