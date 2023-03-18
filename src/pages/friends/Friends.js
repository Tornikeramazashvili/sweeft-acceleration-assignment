import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import './Friends.css'

export const Friends = (props) => {

    const { userId } = props;
    const [friends, setFriends] = useState([]);
    const [offset, setOffset] = useState(1);
    const [size, setSize] = useState(10);
    const URL = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user'

    const getAllFriends = async () => {
        const { data } = await axios.get(`${URL}/${userId}/friends/${offset}/${size}`);
        console.log(data)
        const newFriends = data.list.map(({ id, imageUrl, prefix, name, lastName, title }) => ({ id, imageUrl, prefix, name, lastName, title }));
        setFriends(oldUsers => [...oldUsers, ...newFriends]);
    };


    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setOffset(offset + 1)
        }
    };

    useEffect(() => {
        getAllFriends();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return (
        <div className='friend-container'>
            <div className='friend-list'>
                {friends.map((friend, index) => (
                    <div className='friend' key={index}>
                        <img className='friend-img' src={friend.imageUrl} alt='friend' />
                        <p className='friend-name'> {friend.prefix} {friend.name} {friend.lastName}</p>
                        <p className='friend-title'>{friend.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
