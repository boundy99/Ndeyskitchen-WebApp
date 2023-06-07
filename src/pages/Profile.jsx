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
      const tokenExists = checkTokenExists();
      const userData = await response.json();

      if (response.ok) {
        setUsers(userData);
      }

      if (!tokenExists) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUsers();
  }, []);

  function checkTokenExists() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith('token=')) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="profile">
      <div className="users">
        {users && users.map(user => <p key={user._id}>{user.password}</p>)}
      </div>
    </div>
  );
}
