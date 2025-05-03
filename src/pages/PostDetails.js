import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments, addComment } from '../api/api';
import { Notyf } from 'notyf';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const notyf = new Notyf();

  useEffect(() => {
    fetchPost(id).then(setPost);
    fetchComments(id).then(setComments);
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const res = await addComment(id, { content: commentText });
    if (res._id) {
      setComments([...comments, res]);
      setCommentText('');
      notyf.success('Comment added');
    } else {
      notyf.error(res.error || 'Failed to add comment');
    }
  };

  if (!post) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <hr />
      <h4>Comments</h4>
      {comments.map(c => (
        <div key={c._id} className="card my-2 p-2">
          <p className="mb-1"><strong>{c.user?.username || 'Anonymous'}:</strong></p>
          <p className="mb-0">{c.content}</p>
        </div>
      ))}

      <form className="mt-4" onSubmit={handleAddComment}>
        <textarea className="form-control mb-2" rows="3" placeholder="Add a comment..."
                  value={commentText} onChange={e => setCommentText(e.target.value)} />
        <button className="btn btn-primary">Post Comment</button>
      </form>
    </div>
  );
}
