import { useState } from 'react';
import { createPost } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPost(post);
    if (res._id) {
      notyf.success('Post created');
      navigate(`/posts/${res._id}`);
    } else {
      notyf.error(res.error || 'Failed to create post');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Title"
               onChange={e => setPost({ ...post, title: e.target.value })} />
        <textarea className="form-control mb-2" rows="5" placeholder="Content"
               onChange={e => setPost({ ...post, content: e.target.value })} />
        <button className="btn btn-success">Publish</button>
      </form>
    </div>
  );
}
