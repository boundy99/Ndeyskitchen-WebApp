import { useEffect, useState } from 'react';

export default function Profile() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const userData = await response.json();

      if (response.ok) {
        setUsers(userData);
      }
    };
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className="profile">
      <div className="users">
        {users && users.map(user => <p key={user._id}>{user.firstName}</p>)}
      </div>
    </div>
  );
}
