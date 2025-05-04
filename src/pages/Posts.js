import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 className="display-4 text-light">Blog Threads</h1>
        <p className="lead text-light">Explore new ideas, read insightful posts, and learn something new with every thread. "Blog Threads" is your space to dive into the world of tech, development, and innovation—one post at a time.</p>
      </div>

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
