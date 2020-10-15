import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userId, setUserID] = useState(0);
  const [users, setUsers] = useState([]);

  const validateNumber = e => {
    let number = e.target.value;
    setUserID(number);
    if (number > 10 || number < 0) {
      alert('Numero solo puede ser del 1 al 10');
      setUserID(0);
      fetchUserById(0);
    }
    fetchUserById(number);
  };

  useEffect(() => {
    async function fetchUsers() {
      const result = await fetch(`https://jsonplaceholder.typicode.com/users/`).then(res =>
        res.json()
      );
      setUsers(result);
    }
    fetchUsers();
  }, []);

  const fetchUserById = id => {
    async function fetchUsers(idUser) {
      let result;
      if (idUser > 0 && idUser <= 10) {
        result = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`).then(res =>
          res.json()
        );
      } else {
        result = await fetch(`https://jsonplaceholder.typicode.com/users/`).then(res => res.json());
      }
      setUsers(result);
    }

    fetchUsers(id);
  };

  const userToShow = Array.isArray(users) ? (
    users.map(user => <p key={user.id}>{user.name}</p>)
  ) : (
    <p>{users.name}</p>
  );
  return (
    <div className='App'>
      <input type='number' name='userId' id='' value={userId} onChange={validateNumber} />
      <div className='user'>{userToShow}</div>
    </div>
  );
}

export default App;
