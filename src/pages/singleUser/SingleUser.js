import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import './SingleUser.css'
import { Friends } from '../friends/Friends';

export const SingleUser = () => {

  const navigate = useNavigate();
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className='user-and-friends-container'>
        <div className='single-user-container'>
          <div>
            <img src={singleUser.imageUrl} className='single-user-img' alt='single user' />
          </div>
          <div className='single-user-inf-container'>
            <div>
              <p className='single-user-name'>
                {singleUser.prefix}
                {singleUser.name}
                {singleUser.lastName}
              </p>
              <p className='single-user-title'>
                {singleUser.title}
              </p>
            </div>
            <div className='single-user-inf'>
              <p>
                <span className='single-user-underline-txt'>Email</span>: {singleUser.email}
              </p>
              <p>
                <span className='single-user-underline-txt'>Ip Address</span>: {singleUser.ip}
              </p>
              <p>
                <span className='single-user-underline-txt'>Ip Address</span>: {singleUser.ip}
              </p>
              <p>
                <span className='single-user-underline-txt'>Job Area</span>: {singleUser.jobArea}
              </p>
              <p>
                <span className='single-user-underline-txt'>Job Type</span>: {singleUser.jobType}
              </p>
            </div>
          </div>
          <div className='single-user-adr-container'>
            <div>
              <span className='single-user-address'>
                {singleUser.company && singleUser.company.name}
                {singleUser.company && singleUser.company.suffix}
              </span>
            </div>
            <div>
              <p>
                <span className='single-user-underline-txt '>City</span>: {singleUser.address && singleUser.address.city}
              </p>
              <p>
                <span className='single-user-underline-txt '>Country</span>: {singleUser.address && singleUser.address.country}
              </p>
              <p>
                <span className='single-user-underline-txt '>State</span>: {singleUser.address && singleUser.address.state}
              </p>
              <p>
                <span className='single-user-underline-txt '>Street Address</span>: {singleUser.address && singleUser.address.streetAddress}
              </p>
              <p>
                <span className='single-user-underline-txt '>ZIP</span>: {singleUser.address && singleUser.address.zipCode}
              </p>
            </div>
          </div>
        </div>
        <div className='friends-container'
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}>
          <p className='friends-title'>Friends:</p>
          <Friends userId={id} onClick />
        </div>
      </div>
    </>
  )
}


