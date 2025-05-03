import { useEffect, useState } from 'react';
import { getUserDetails } from '../api/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5 text-light">
      <h3>User Profile</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {user && (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}
    </div>
  );
}
