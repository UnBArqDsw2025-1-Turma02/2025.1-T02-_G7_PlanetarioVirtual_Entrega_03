import type { Post } from '@/services/api';
import { PostItem } from './PostItem';

type PostListProps = {
  posts: Post[];
  onCommentSubmit: (postId: number, commentText: string) => void; 
};

export function PostList({ posts, onCommentSubmit }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          onCommentSubmit={onCommentSubmit} 
        />
      ))}
    </div>
  );
}