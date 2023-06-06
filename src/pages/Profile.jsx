import { useEffect, useState } from 'react';

export default function Profile() {
  const [users, setUsers] = useState(null);

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

      if (response.ok) {
        setUsers(userData);
        console.log(userData);
      }

      if (!response.ok) console.log('You suck');
    };
    fetchUsers();
  }, []);
  console.log(localStorage.getItem('token'));
  console.log(users);

  return (
    <div className="profile">
      <div className="users">
        {users && users.map(user => <p key={user._id}>{user.password}</p>)}
      </div>
    </div>
  );
}
