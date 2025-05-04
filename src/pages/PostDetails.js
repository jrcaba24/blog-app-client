import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, fetchComments, addComment, deleteComment, getUserDetails, adminDeletePost, adminDeleteComment, updatePost, deletePost } from '../api/api';
import { Notyf } from 'notyf';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState('');
  const notyf = new Notyf();

  useEffect(() => {
    fetchPost(id).then(setPost);
    fetchComments(id).then(setComments);
    getUserDetails()
      .then((data) => {
        console.log('User Data:', data);  // Log user data to check if the role is set correctly
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

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(id);
      navigate('/'); // Use navigate instead of history.push
      notyf.success('Post deleted');
    } catch (err) {
      notyf.error(err.message || 'Failed to delete post');
    }
  };

  const handleAdminDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post (Admin)?')) return;
    try {
      await adminDeletePost(id);
      navigate('/'); // Redirect to home page after deleting
      notyf.success('Post deleted by admin');
    } catch (err) {
      notyf.error(err.message || 'Failed to delete post');
    }
  };

  const handleAdminDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment (Admin)?')) return;
    try {
      await adminDeleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
      notyf.success('Comment deleted by admin');
    } catch (err) {
      notyf.error(err.message || 'Failed to delete comment');
    }
  };

  const handleEditPost = () => {
    setIsEditing(true);
    setUpdatedContent(post.content); // Pre-fill content in the editing form
  };

  const handleSavePost = async () => {
    try {
      const updatedPost = await updatePost(id, { content: updatedContent });
      setPost(updatedPost);
      setIsEditing(false);
      notyf.success('Post updated');
    } catch (err) {
      notyf.error(err.message || 'Failed to update post');
    }
  };

  if (!post) return <div className="container mt-5">Loading...</div>;

  const userId = user?._id || user?.id;
  const isPostAuthor = user && String(post.author?._id) === String(userId);
  const isAdmin = user && user.isAdmin === true; // Check if the logged-in user is an admin

  console.log('Is Admin:', isAdmin);  // Log to confirm the admin check

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <p>{post.username}</p>

      {/* Show edit post form if in editing mode */}
      {isEditing ? (
        <div>
          <textarea
            className="form-control mb-2"
            rows="3"
            value={updatedContent}
            onChange={e => setUpdatedContent(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSavePost}>Save</button>
          <button className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{post.content}</p>
      )}

      {/* Show edit and delete buttons only if the logged-in user is the author of the post */}
      {isPostAuthor && (
        <div>
          <button className="btn btn-primary" onClick={handleEditPost}>Edit</button>
          <button className="btn btn-danger ms-2" onClick={handleDeletePost}>Delete</button>
        </div>
      )}

      {/* Show admin delete buttons for admin users */}
      {isAdmin && (
        <div>
          <button className="btn btn-danger" onClick={handleAdminDeletePost}>Delete Post</button>
        </div>
      )}

      <hr />
      <h4>Comments</h4>
      {comments.map(c => {
        const isCommentAuthor = user && String(c.author?._id) === String(userId);
        return (
          <div key={c._id} className="card my-2 p-2">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1">
                  <strong>{isCommentAuthor ? 'You' : c.author?.username}:</strong>
                </p>
                <p className="mb-0">{c.content}</p>
              </div>
              {isCommentAuthor && (
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleDeleteComment(c._id)}
                >
                  Delete
                </button>
              )}
              {isAdmin && (
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleAdminDeleteComment(c._id)}
                >
                  Delete Comment
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
