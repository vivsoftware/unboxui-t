import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RegisterSIModal from '../Components/Pages/Admin Dashboard/RegisterUserModal'
import CreateRFQModal from '../Components/Pages/Buyer Dashboard/CreateRFQModal'
import SellerDashboard from '../Components/Pages/Seller Dashboard/SellerDashboard'
import { auth } from '../Config/firebase'
import DashboardFooter from '../Layout/Common/Footer/DashboardFooter'
import Layout from '../Layout/Layout'
import spring_boot_url from '../Utils/springApi'
const sellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [rfq, setRFQ] = useState(null);
  const [tender, settender] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)
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
  const userId = userDe?.id;
  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq/${userId}`)
      .then(resp => {
        setRFQ(resp.data);
      })
      .catch(error => {
        console.error('Error fetching user RFQ data:', error);
      });
  }, [userId]); // Include userId in the dependency array
  

  useEffect(() => {
    axios.get(`${spring_boot_url}api/tender/${userId}`)
      .then(resp => {
        settender(resp.data);
      })
      .catch(error => {
        console.error('Error fetching user RFQ data:', error);
      });
  }, [userId]); // Include userId in the dependency array

  return (
    <>
    <Layout/>
      <SellerDashboard rfq={rfq} tender={tender} userDe={userDe}/>
      <RegisterSIModal/>
       <CreateRFQModal rfq={rfq} />
        <DashboardFooter/>
    </>
  )
}

export default sellerDashboard
