import React, { useEffect, useState } from 'react';
import { UserDashboardData } from '../../../Data/UserDashboardData';
import AccountInformation from './AccountInformation';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
import { useRouter } from 'next/router';
import { auth } from '../../../Config/firebase';

const DashBoardContain = () => {
  const [user, setUser] = useState(null);
  const [userDe, setUserDe] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
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
        setUser(null);
        if (!user) {
          router.push("/page/loginunbox");
        }
      }
      return () => {
        unsubscribe();
      };
    })
  }, []);

  const DashboardFilter = UserDashboardData.filter((el) => el.type === 'Dashboard');
  return (
    <div className='dashboard-right'>
      {DashboardFilter.map((el) => {
        return el.tabs.map((elem, i) => {
          return (
            <div className='dashboard' key={i}>
              <div className='page-title title title1 title-effect'>
                <h2>{elem.title}</h2>
              </div>
              <div className='welcome-msg'>
                <h6 className='font-light'>
                  {elem.greet}
                  {userDe ? (
                    <span>{userDe.firstName} {userDe.lastName}</span>
                  ) : (
                    <span>Please wait...</span>
                  )}
                </h6>
                <p className='font-light'>
                  {elem.description}
                  </p>
              </div>
              {userDe ? (
                <AccountInformation userDe={userDe} />
              ) : (
                <span>Please wait...</span>
              )}
            </div>
          );
        });
      })}
    </div>
  );
};

export default DashBoardContain;
