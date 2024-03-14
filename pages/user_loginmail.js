import React, { useState, useEffect } from 'react';
import spring_boot_url from "../Utils/springApi";
import axios from "axios";
import { auth } from "../Config/firebase";
import { useRouter } from 'next/router';

const UserLoginMail = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userDe, setUserDe] = useState(null);
    const [email, setemail] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
  
    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        setUser(user)
      })
  
      if (user && user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          })
      }
  user_Login();
      const timer = setInterval(() => {
        setDateTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, [user]);
  
    const user_Login = () => {
      const student = {
        name: "User",
        phone: `${userDe.phoneNumber}`,
        email: `${userDe.email}`,
        message: `User is login at ${dateTime.toLocaleString()}`
      };
  
      fetch(`${spring_boot_url}contactUs/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      })
        .then((resp) => {
          if (resp.ok === true) {
            toast(`User login successfully`, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            router.push("/user_dashboard"); // Replace with your own page path

          }
        });
    };

}

export default UserLoginMail;
