import PostCard from '../PostCard';
import './styles.css';
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
 export default Post;
