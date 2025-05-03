import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 className="display-4 text-light">Welcome to Our Blog!</h1>
        <p className="lead text-light">Stay up to date with the latest insights and stories. Dive into the articles below!</p>
      </div>

      <h2 className="mb-4 text-light">Latest Posts</h2>
      {posts.length === 0 ? (
        <div className="alert alert-info">No posts available yet. Check back soon!</div>
      ) : (
        posts.map(post => (
          <div className="card my-3 p-3" key={post._id}>
            <h5>{post.title}</h5>
            <p>{post.content.slice(0, 100)}...</p>
            <Link className="btn btn-primary btn-sm" to={`/posts/${post._id}`}>Read more</Link>
          </div>
        ))
      )}
    </div>
  );
}
