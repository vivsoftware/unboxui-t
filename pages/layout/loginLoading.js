import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import Layout4 from '../../Layout/Layout4';
import { Color } from '../../Components/Constant';
import Enquire from './Enquire';
import spring_boot_url from '../../Utils/springApi';
import { auth } from '../../Config/firebase';
import axios from 'axios';

export default function LinearIndeterminate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [userDe, setUserDe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user.email) {
        try {
          const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`, {
            headers: {
                Authorization: 'API Key  X-API-KEY: rachna,' 
            },
          });
          console.log(response.data);
          localStorage.setItem('data', JSON.stringify(response.data));
          setUserDe(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, '');
        console.log('phonenumbereeeee', phoneNumberd);
        try {
          const response = await axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`, {
            headers: {
                Authorization: 'API Key  X-API-KEY: rachna,' 
            },
          });
          console.log(response.data);
          localStorage.setItem('data', JSON.stringify(response.data));
          setUserDe(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (userDe && userDe.firstName) { // Check if userDe is not null and has the firstName property
      const userDetails = { name: userDe.firstName, phone: userDe.phoneNumber, email: userDe.email };
      fetch(`${spring_boot_url}api/login/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'API Key  X-API-KEY: rachna,' 
         
        },
        body: JSON.stringify(userDetails),
      })
        .then((resp) => {
          seterror(resp);
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
        });
    } else {
      console.error("userDe is null or doesn't have the firstName property");
    }
  };

  console.log('userrrrrrr', userDe);
  return (
    <>
      <Layout4 className="home-page">
        <Head>
          <title>Unbox Industry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Box.ico" />
        </Head>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Adjust the height as per your requirements
          }}
        >
          <Box sx={{ width: '50%', backgroundColor: 'red' }}>
            <LinearProgress />
          </Box>
        </Box>
        <button onClick={handleClick}>senddddd</button>
        <Enquire />
      </Layout4>
    </>
  );
}
