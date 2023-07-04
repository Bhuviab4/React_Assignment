import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">AirData</div>
        <button className="btn" onClick={getUsers} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get users'}
        </button>
      </nav>

      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="grid">
          {users.map((user) => (
            <div key={user.id} className="user">
              <img src={user.avatar} alt={user.first_name} />
              <div className="username">{`${user.first_name} ${user.last_name}`}</div>
              <div className="email">{user.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;