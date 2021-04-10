import PostCard from '../PostCard';

const Post = ({posts}) => (
    <div className="posts">
    {posts.map(post => (
      <PostCard
        key = {post.id}
        post = {post}
      />
      ))}
  </div>
)

export default Post