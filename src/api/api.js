const API_BASE = 'http://localhost:4000';

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const fetchPosts = () => fetch(`${API_BASE}/posts`).then(res => res.json());

export const fetchPost = (id) => fetch(`${API_BASE}/posts/${id}`).then(res => res.json());

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
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
