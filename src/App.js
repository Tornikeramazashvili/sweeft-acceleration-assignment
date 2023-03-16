import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  let offset = 0
  const [users, setUsers] = useState([])

  const getAllUsers = () => {
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/10&offset=${offset}`).then(({ data }) => {
      const newUser = [];
      data.list.forEach((user) => {
        const { imageUrl, prefix, name, lastName, title } = user;
        newUser.push({ imageUrl, prefix, name, lastName, title });
      });
      setUsers(olduser => [...olduser, ...newUser])
    });
    offset += 10;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      getAllUsers()
    }
  }

  useEffect(() => {
    getAllUsers()
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className='users'>
        {users.map((user, index) => (
          <div key={index} className='user-container'>
            <img className='user-image' src={user.imageUrl} alt='user' />
            <p className='user-name'> {user.prefix} {user.name} {user.lastName}</p>
            <p className='user-title'>{user.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
