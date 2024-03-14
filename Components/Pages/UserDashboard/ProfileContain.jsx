import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserDashboardData } from '../../../Data/UserDashboardData';
import LoginDetail from './LoginDetail';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
import { auth } from '../../../Config/firebase';

const ProfileContain = () => {
  const dispatch = useDispatch();
  const ProfileFilter = UserDashboardData.filter((el) => el.type === 'Profile');
  const openProfileModal = () => {
    dispatch({ type: 'ISPROFILEMODAL' });
  };

  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
          });
      } else {
        setuser(null);
        if (!user) {
          router.push("/login");
        }
      }
      return () => {
        unsubscribe();
      };
    })
  }, []);

  return (
    <Fragment>
      {ProfileFilter.map((item, i) => {
        return (
          <Fragment key={i}>
            <div className='box-head'>
              <h3>Profile</h3>
            </div>
            <ul className='dash-profile'>
              <li>
                <div className='left'>
                  <h6 className='font-light'> Name</h6>
                  <h6 className='font-light'>Email</h6>
                  <h6 className='font-light'>Phone Number</h6>
                </div>
                <div className='right'>
                  {userDe ? (
                    <h6>{userDe.firstName} {userDe.lastName} </h6>
                  ) : (
                    <p></p>
                  )}
                  {userDe ? (
                    <h6>{userDe.email}  </h6>
                  ) : (
                    <p></p>
                  )}
                  {userDe ? (
                    <h6>+{userDe.phoneNumber}  </h6>
                  ) : (
                    <p></p>
                  )}
                </div>
              </li>
            </ul>
            <div className='box-head mt-lg-5 mt-3'>
              <h3>Change Password</h3>
            </div>
            <LoginDetail item={item} openProfileModal={openProfileModal} userDe={userDe} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default ProfileContain;
