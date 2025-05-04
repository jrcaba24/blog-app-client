import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments, addComment, deleteComment, getUserDetails } from '../api/api';
import { Notyf } from 'notyf';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState(null);
  const notyf = new Notyf();

  useEffect(() => {
    fetchPost(id).then(setPost);
    fetchComments(id).then(setComments);
    getUserDetails()
      .then((data) => {
        console.log('Fetched user:', data); // Debug user object
        setUser(data);
      })
      .catch(() => setUser(null));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addComment(id, { content: commentText });
      setComments([...comments, newComment]);
      setCommentText('');
      notyf.success('Comment added');
    } catch (err) {
      notyf.error(err.message || 'Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
      notyf.success('Comment deleted');
    } catch (err) {
      notyf.error(err.message || 'Failed to delete comment');
    }
  };

  if (!post) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <p>{post.username}</p>
      <p>{post.content}</p>

      <hr />
      <h4>Comments</h4>
      {comments.map(c => {
      const userId = user?._id || user?.id;
      const isAuthor = user && String(c.author?._id) === String(userId);

      return (
        <div key={c._id} className="card my-2 p-2">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1">
                <strong>{isAuthor ? 'You' : c.author?.username}:</strong>
              </p>
              <p className="mb-0">{c.content}</p>
            </div>
            {isAuthor && (
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => handleDeleteComment(c._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      );
    })}


      <form className="mt-4" onSubmit={handleAddComment}>
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Add a comment..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <button className="btn btn-primary">Post Comment</button>
      </form>
    </div>
  );
}
