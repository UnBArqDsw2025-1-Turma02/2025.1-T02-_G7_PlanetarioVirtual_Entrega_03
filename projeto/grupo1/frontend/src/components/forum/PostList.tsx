import type { Post } from '@/services/api';
import { PostItem } from './PostItem';

type PostListProps = {
  posts: Post[];
  onDeletePost: (postId: number) => void;
};

export function PostList({ posts, onDeletePost }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
}