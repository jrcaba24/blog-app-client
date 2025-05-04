const API_BASE = 'http://localhost:4000';

const headers = () => {
  const token = localStorage.getItem('token'); // or sessionStorage, depending on where you store it
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '', // If token exists, include it in the header
  };
};

export const fetchPosts = () => 
    fetch(`${API_BASE}/posts`, {
        method: 'GET',
        headers: headers()
    }).then(res => res.json());

export const fetchPost = (id) => fetch(`${API_BASE}/posts/${id}`, {
  method: 'GET',
  headers: headers()
}).then(res => res.json());

export const createPost = (data) =>
  fetch(`${API_BASE}/posts/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const login = (data) =>
  fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const register = (data) =>
  fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  }).then(res => res.json());

  export const getUserDetails = async () => {
    const response = await fetch(`${API_BASE}/users/details`, { headers: headers() });
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return response.json();
  };
  

export const fetchComments = (postId) =>
  fetch(`${API_BASE}/comments/post/${postId}`).then(res => res.json());

export const addComment = (postId, data) =>
  fetch(`${API_BASE}/comments/${postId}`, {
    method: 'POST',
    headers: headers(), // This will now include the Authorization header
    body: JSON.stringify(data)
  }).then(res => res.json());

  export const deleteComment = (commentId) =>
    fetch(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE',
      headers: headers()
    }).then(async res => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to delete comment');
      }
      return res.json();
    });
  
