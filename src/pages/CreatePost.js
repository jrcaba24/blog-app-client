import { useState } from 'react';
import { createPost } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(post); // If this doesn't throw, assume success
      notyf.success('Post created');
      navigate('/'); // Redirect to home or any other page you like
    } catch (err) {
      console.error(err);
      notyf.error(err.message || 'Failed to create post');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="postTitle" className="form-label">Title</label>
          <input
            type="text"
            id="postTitle"
            className="form-control"
            placeholder="Enter post title"
            onChange={e => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postAuthor" className="form-label">Author</label>
          <input
            type="text"
            id="postAuthor"
            className="form-control"
            placeholder="Enter post author"
            onChange={e => setPost({ ...post, author: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postContent" className="form-label">Content</label>
          <textarea
            id="postContent"
            className="form-control"
            rows="5"
            placeholder="Enter post content"
            onChange={e => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <button className="btn btn-success">Publish</button>
      </form>
    </div>
  );
}
