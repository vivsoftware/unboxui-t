import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../Config/firebase';
import { AdminDashboardData } from '../../../Data/AdminDashboardData';
import spring_boot_url from '../../../Utils/springApi';
import AllTabContain from './AllTabContain';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [num, setNum] = useState(1);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)
  const [serviceProviders, setServiceProviders] = useState([]);
  const handleClick = (index) => {
    // setActiveTab(index === activeTab ? null : index);
    setActiveTab(index);
  };

  const toggle = (id) => {
    setNum(id);
  };

  useEffect(() => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
      .then(resp => {
        console.log(resp.data.json);
        setSellers(resp.data);
      });
    axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
      .then(resp => {
        console.log(resp.data.json);
        setBuyers(resp.data);
      });
  }, []);



  ///////////////////user login ///////////////////////////

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            setUserDe(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            setUserDe(resp.data);
          });
      }
    })
  }, [])

  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='container-fluid' style={{ marginLeft: '-10px' }}>
          <div className='row'>
            <div className='col-lg-2 col-md-2'>
              {activeTab == null ? (
                <div className='admin-sidebar '>
                  {AdminDashboardData.map((elem, i) => (
                    <div className={`${activeTab === i ? 'thick-border' : ''}`} onClick={() => handleClick(i)} key={i}>
                      <img className="admin-icon" src={elem.image} />
                      <p
                        className={`mt-2 text-center`}
                      >
                        {elem.type}
                      </p>
                    </div>
                  ))}
                </div>) : (
                <div className='admin-sidebar '>
                  {AdminDashboardData.map((elem, i) => (
                    <div className={`${activeTab === i ? 'thick-border' : ''}`} onClick={() => handleClick(i)} key={i}>
                      <img className="admin-icon" src={elem.image} />
                      <p
                        className={`mt-2 text-center`}
                      >
                        {elem.type}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='col-lg-10 col-md-10' >
              <AllTabContain activeTab={activeTab} num={num} userDe={userDe} sellers={sellers} buyers={buyers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
