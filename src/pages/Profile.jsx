import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      });

      const userData = await response.json();

      if (!response.ok) navigate('/login');

      setUsers(userData);
    };
    fetchUsers();
  }, []);

  return (
    <div className="profile">
      <div className="users">
        {users && users.map(user => <p key={user._id}>{user.password}</p>)}
      </div>
    </div>
  );
}
