import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


export const SingleUser = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`);
      const userData = await response.json();
      setSingleUser(userData);
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <p>{singleUser.name}</p>
    </div>
  )
}
