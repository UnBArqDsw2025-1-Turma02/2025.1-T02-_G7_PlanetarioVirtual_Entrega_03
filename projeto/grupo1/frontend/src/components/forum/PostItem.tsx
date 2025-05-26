import type { Post } from '@/services/api';
import { CommentForm } from './CommentForm';

type PostItemProps = {
  post: Post;
  onCommentSubmit: (postId: number, commentText: string) => void;
};

export function PostItem({ post, onCommentSubmit }: PostItemProps) {
  const handleCommentSubmit = (commentText: string) => {
    onCommentSubmit(post.id, commentText);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-600 mr-4 flex-shrink-0"></div>
        <div>
          <p className="font-semibold text-white">{post.autor.nome}</p>
          <p className="text-xs text-gray-400">
            Postado em {new Date(post.dataCriacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{post.texto}</p>

      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Comentários ({post.comentarios.length})</h4>

        <div className="space-y-3 mb-4">
          {post.comentarios.map(comment => (
            <div key={comment.id} className="text-xs">
              <span className="text-gray-300">
                <strong className="font-medium">{comment.autor.nome}</strong> 
                <span className="text-gray-500 ml-2">
                  ({new Date(comment.dataCriacao).toLocaleDateString('pt-BR')})
                </span>
                : {comment.texto}
              </span>
            </div>
          ))}
        </div>

        <CommentForm onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
}