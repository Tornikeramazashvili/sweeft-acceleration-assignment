import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const URL = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/10&offset='

  const getAllUsers = async () => {
    const { data } = await axios.get(`${URL}${offset}`);
    const newUser = data.list.map(({ imageUrl, prefix, name, lastName, title }) => ({ imageUrl, prefix, name, lastName, title }));
    setUsers(oldUsers => [...oldUsers, ...newUser]);
    setOffset(offset + 10);
  };

  const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='user-container'>
        <div className='user-list'>
          {users.map((user, index) => (
            <div key={index} className='user'>
              <img className='user-image' src={user.imageUrl} alt='user' />
              <p className='user-name'> {user.prefix} {user.name} {user.lastName}</p>
              <p className='user-title'>{user.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
