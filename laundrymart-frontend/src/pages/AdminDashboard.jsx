import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>{users.map(user => <li key={user.id}>{user.username} - {user.role}</li>)}</ul>
      {/* Add forms for adding employees/riders, managing orders */}
    </div>
  );
};

export default AdminDashboard;