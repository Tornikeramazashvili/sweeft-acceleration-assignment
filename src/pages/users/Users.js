import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import './Users.css';

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [offset, setOffset] = useState(1);
    const [size, setSize] = useState(10);
    const URL = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user'
    const navigate = useNavigate();

    const getAllUsers = async () => {
        const { data } = await axios.get(`${URL}/${offset}/${size}`);
        const newUser = data.list.map(({ id, imageUrl, prefix, name, lastName, title }) => ({ id, imageUrl, prefix, name, lastName, title }));
        setUsers(oldUsers => [...oldUsers, ...newUser]);

    };

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setOffset(offset + 1)
        }
    };

    useEffect(() => {
        getAllUsers();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return (
        <>
            <div className='user-container'>
                <div className='user-list'>
                    {users.map((user, index) => (
                        <div className='user' key={index}
                            onClick={() => navigate(`/user/${user.id}`)}>
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
