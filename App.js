import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <div key={user.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <img src={user.avatar} alt="User Avatar" />
          <p>ID: {user.id}</p>
          <p>
          Name:{" "}
          {user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ? (
            <span className="highlight">{user.first_name}</span>
          ) : (
            user.first_name
          )}
        </p>
        </div>
      ))}
    </div>
  );
};

export default App;
