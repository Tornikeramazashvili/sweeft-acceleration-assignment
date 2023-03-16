import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  let offset = 0
  const [users, setUsers] = useState([])

  const getAllUsers = () => {
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/10&offset=${offset}`).then(({ data }) => {
      const newUser = [];
      data.list.forEach((u) => newUser.push(u.name));
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
      <div>
        <ol>
          {users.map((u, i) => (
            <li className='li' key={i}>{u}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
